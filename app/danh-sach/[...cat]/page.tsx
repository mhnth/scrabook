import NullPage from '@/components/null-page';
import Pagination from '@/components/pagination';
import { home } from '@/constants/home';
import crawl from '@/controller/crawl';
import Link from 'next/link';

export default async function Page({
  params,
  searchParams,
}: {
  params: { cat: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const inputPath = 'danh-sach/' + params.cat;
  const data = await crawl.gen(inputPath, searchParams.page as string);
  const option = home.find((o) => o.input === inputPath + '/');

  console.log('page:', searchParams.page, data);

  if (data)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between px-2">
        <div className="page-w mt-4 flex flex-wrap gap-2 md:px-6">
          {home.map((o, i) => {
            return (
              <Link
                className="item-cat rounded-md bg-slate-700 px-2 py-1 text-xs font-semibold"
                href={`/${o.input}`}
                key={i}
              >
                {' '}
                {o.title}{' '}
              </Link>
            );
          })}
        </div>
        <div className="page-w mt-2 text-lg md:ml-12">{option?.title}</div>
        <div className="list page-w grid gap-1 md:grid-cols-2 md:px-8">
          {data.novelList.map((n, i) => {
            return (
              <Link
                className="border-b border-slate-700 py-1"
                href={`/${n.link}`}
                key={i}
              >
                <div className="mb-3 flex">
                  <div className="h-20 w-20">
                    <img
                      className="h-full w-full rounded-md object-cover"
                      src={n.cover}
                      alt={n.name}
                    />
                  </div>
                  <div className="ml-2 w-4/5">
                    <h4 className="font-semibold">{n.name}</h4>
                    <span>{n.author}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Pagination current={data.current} />
      </main>
    );

  return <NullPage />;
}
