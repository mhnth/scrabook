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
  const chap = params.chap.split('-').slice(-1) as unknown as string;

  if (data)
    return (
      <div className="chap-c page-w mx-auto px-2">
        <div className="mt-4 flex text-sm font-semibold text-blue-900 dark:text-slate-300">
          <Link href={'./'}>{data.name}</Link>
          <ArrowRight />
          {/* <span className="font-normal ">{'Chương ' + chap}</span> */}
          <span className="font-normal ">{data.chapterTitle}</span>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <Link
            className={cx(
              chap == '1' && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={params.chap.replace(
              'chuong-' + chap,
              'chuong-' + (+chap - 1),
            )}
          >
            <ArrowLeft className="fill-slate-200" />
          </Link>
          <Link
            className={cx(
              chap == '' && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={params.chap.replace(
              'chuong-' + chap,
              'chuong-' + (+chap + 1),
            )}
          >
            <ArrowRight className="fill-slate-200" />
          </Link>
        </div>

        <div
          className="mt-4 leading-8 md:text-lg md:leading-10"
          dangerouslySetInnerHTML={{ __html: data.text! }}
        />

        <div className="mt-8 flex justify-center gap-2">
          <Link
            className={cx(
              chap == '1' && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={'chuong-' + (+chap - 1)}
          >
            <ArrowLeft className="fill-slate-200" />
          </Link>
          <Link
            className={cx(
              chap == '55' && 'pointer-events-none opacity-50',
              'rounded-sm border border-slate-400 px-2 py-[2px]',
            )}
            href={'chuong-' + (+chap + 1)}
          >
            <ArrowRight className="fill-slate-200" />
          </Link>
        </div>
      </div>
    );

  return <NullPage />;
}
