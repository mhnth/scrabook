import { ListGrid } from '@/components/list-grid';
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

  if (data)
    return (
      <main className="mt-10 flex min-h-screen flex-col items-center justify-between px-2">
        <div className="page-w mt-4 flex flex-wrap gap-2 md:px-6">
          {home.map((o, i) => {
            return (
              <Link
                className="item-cat w-max rounded-md bg-cyan-700 px-2 py-1 text-xs font-semibold text-[#f0f0f0] dark:bg-slate-700"
                href={`/${o.input}`}
                key={i}
              >
                {' '}
                {o.title}{' '}
              </Link>
            );
          })}
        </div>
        <div className="page-w mt-2 text-lg text-gray-800 md:ml-12">
          {option?.title}
        </div>
        <ListGrid novelList={data.novelList} />
        <Pagination current={data.current} isNext={data.isNext} />
      </main>
    );

  return <NullPage />;
}
