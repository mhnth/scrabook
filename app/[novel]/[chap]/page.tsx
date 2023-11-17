import ArrowLeft from '@/components/icons/arrow-left';
import ArrowRight from '@/components/icons/arrow-right';
import NullPage from '@/components/null-page';
import crawl from '@/controller/crawl';
import { cx } from '@/lib/utils';
import Link from 'next/link';

export default async function Page({
  params,
  searchParams,
}: {
  params: { novel: string; chap: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await crawl.getChap(params.novel + '/' + params.chap);
  // const chap = params.chap.split('-').slice(-1) as unknown as string;

  if (data) {
    const { chapterTitle, nextChap, novelName, prevChap, text } = data;
    return (
      <div className="chap-c page-w mx-auto px-2">
        <div className="mt-8 flex flex-col items-center gap-3 text-sm font-semibold text-blue-900 dark:text-slate-300 md:mt-12">
          <Link href={'./'}>{data.novelName}</Link>
          <span className="text-xl font-light md:text-3xl">
            {data.chapterTitle}
          </span>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <Link
            className={cx(
              !prevChap && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={'/' + prevChap!}
          >
            <ArrowLeft className="fill-slate-200" />
          </Link>
          <Link
            className={cx(
              !nextChap && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={'/' + nextChap!}
          >
            <ArrowRight className="fill-slate-200" />
          </Link>
        </div>

        <div
          className="mx-auto mt-10 max-w-2xl leading-8 md:mt-16 md:text-lg md:leading-10"
          dangerouslySetInnerHTML={{ __html: data.text! }}
        />

        <div className="mt-8 flex justify-center gap-2">
          <Link
            className={cx(
              !prevChap && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={'/' + prevChap!}
          >
            <ArrowLeft className="fill-slate-200" />
          </Link>
          <Link
            className={cx(
              !nextChap && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={'/' + nextChap!}
          >
            <ArrowRight className="fill-slate-200" />
          </Link>
        </div>
      </div>
    );
  }

  return <NullPage />;
}
