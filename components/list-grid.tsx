import { home } from '@/constants/home';
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
      <div className="list page-w grid gap-1 md:grid-cols-2 md:px-8">
        {novelList.map((n, i) => {
          return (
            <div
              className="flex w-full border-b border-slate-700 py-1 pb-4"
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
              <div className="ml-2 w-4/5">
                <Link href={`/${n.link}`}>
                  <h4 className="w-max font-semibold">{n.name}</h4>
                  <span>{n.author}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
