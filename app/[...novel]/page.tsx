import NovelDesc from '@/components/novel-desc';
import NullPage from '@/components/null-page';
import crawl from '@/controller/crawl';

export default async function Page({
  params,
  searchParams,
}: {
  params: { novel: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const novel = await crawl.getInfo(params.novel);

  if (novel)
    return (
      <>
        <div>
          <div className="n-info">
            <div className="n-name font-semibold dark:text-slate-300">
              {novel.name}
            </div>
            <div className="n-cover">
              <img className="rounded-md" src={novel.cover} alt="" />
            </div>
            <div className="n-details ml-4 flex justify-center text-sm leading-8">
              <div
                dangerouslySetInnerHTML={{
                  __html: novel.details || '<p>mô trả trống</p>',
                }}
              />
            </div>
            <div className="n-toolbar flex justify-center">toobar</div>
          </div>
          <NovelDesc html={novel.description!} />
        </div>
      </>
    );

  return <NullPage />;
}
