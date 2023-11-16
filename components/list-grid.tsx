import Link from 'next/link';
import React from 'react';

interface NovelData {
  novelList: {
    name: string;
    link: string | undefined;
    author: string;
    cover: string | undefined;
    host: string;
  }[];
}

interface ListGridProps extends NovelData {}

export const ListGrid: React.FC<ListGridProps> = ({ novelList }) => {
  return (
    <>
      <div className="list page-w mb-12 grid gap-1 text-gray-800 md:grid-cols-2 md:gap-4 md:px-8">
        {novelList.map((n, i) => {
          return (
            <div
              className="flex w-full border-b border-gray-300 py-1 pb-4 dark:border-slate-700 dark:text-gray-300"
              key={i}
            >
              <Link href={`/${n.link}`}>
                <div className="h-20 w-20">
                  <img
                    className="h-full w-full rounded-md object-cover"
                    src={n.cover}
                    alt={n.name}
                  />
                </div>
              </Link>
              <div className="ml-2">
                <Link href={`/${n.link}`}>
                  <div className="text-sm font-semibold md:text-base">
                    {n.name}
                  </div>
                  <span className="text-sm opacity-80">{n.author}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
