import { ListGrid } from '@/components/list-grid';
import Pagination from '@/components/pagination';
import crawl from '@/controller/crawl';

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { q: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q, page } = searchParams;
  const data = await crawl.search(q as string, (page as string) || '1');
  if (data)
    return (
      <main className="mt-10 flex min-h-screen flex-col items-center justify-between px-2">
        <div className="page-w mt-2 text-lg md:ml-12">{`Kết quả với '${q}'`}</div>
        <ListGrid novelList={data.novelList} />
        <Pagination
          current={data.current}
          q={q as string}
          isNext={data.isNext}
        />
      </main>
    );
}
