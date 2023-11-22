import NovelDesc from '@/components/novel-desc';
import NullPage from '@/components/null-page';
import crawl from '@/controller/crawl';
import { cx } from '@/lib/utils';
import Link from 'next/link';
import { cache } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';

const getInfo = cache(async (path: string) => {
  const info = await crawl.getInfo(path);

  return info;
});

type Props = {
  params: { novel: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const novel = await getInfo(params.novel)!;

  return {
    title: novel?.name,
    openGraph: {
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      description: `${novel?.name} - scrabook`,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { novel: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const novel = await getInfo(params.novel)!;
  const listChapter = await crawl.getChapsUrl(
    params.novel,
    (searchParams.listChapter_page as string) || '1',
  );

  const colListChapter = listChapter!.length > 25 ? [0, 1] : [1];
  const half = (listChapter && Math.ceil(listChapter.length / 2)) || 1;

  if (novel && listChapter)
    return (
      <>
        <div className="page-w mx-auto mt-4 px-2 md:mt-12">
          <div className="n-info">
            <h2 className="n-name font-semibold text-gray-700 dark:text-slate-300">
              {novel.name}
            </h2>
            <div className="n-cover">
              <img
                loading="lazy"
                className="rounded-md md:w-36"
                src={novel.cover}
                alt=""
              />
            </div>
            <div className="n-details ml-4 flex text-sm leading-8 md:ml-0">
              <div dangerouslySetInnerHTML={{ __html: novel.details }} />
            </div>
            <div className="n-toolbar flex justify-center gap-2 text-sm font-semibold md:justify-start">
              <span>
                <a href="#">Đọc ngay</a>
              </span>
              <span>
                <a href="#list-chapter">Chương</a>
              </span>
              <span>Đánh dấu</span>
            </div>
          </div>

          <NovelDesc html={novel.description!} />

          <h3 id="list-chapter" className="mt-8">
            Danh sách chương
          </h3>
          <div
            id="list-chapter2"
            className="list-chapter grid gap-x-4 md:grid-cols-2"
          >
            {colListChapter.map((a, i) => {
              let _i = i;

              const slice = _i === 0 ? [0, half] : [half];

              return (
                <ul
                  key={i}
                  className={cx(i === 1 && '[&>*:last-child]:border-0')}
                >
                  {listChapter.slice(...slice).map((c, y) => {
                    return (
                      <li
                        key={y}
                        className="border-b pb-2 pt-2 text-gray-700 dark:border-slate-700 dark:font-light dark:text-gray-300"
                      >
                        <Link className="" href={`${c.input}`}>
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>

          {/* pagination list page */}
          <div className="num-page mt-8 flex flex-wrap justify-center gap-1">
            {Array.from({ length: +novel.total_page! }, (_, i) => {
              return (
                <Link
                  key={i}
                  className={cx(
                    'border border-slate-700 px-3 py-1',
                    i + 1 === +searchParams.listChapter_page! &&
                      'bg-slate-300 text-gray-900',
                  )}
                  href={`${params.novel}?listChapter_page=${
                    i + 1
                  }#list-chapter`}
                >
                  {i + 1}
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );

  return <NullPage />;
}
