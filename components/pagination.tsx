'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ArrowRight from './icons/arrow-right';
import ArrowLeft from './icons/arrow-left';
import { cx } from '@/lib/utils';

export default function Pagination({
  current,
  q,
  isNext,
}: {
  current: string;
  q?: string;
  isNext?: boolean;
}) {
  const [inputValue, setInputValue] = useState<string>(current);
  const router = useRouter();
  let next = +current + 1;
  let prev = +current - 1;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const page = (e.currentTarget[0] as any).value;

    router.push(`?page=${page}`);
  };

  useEffect(() => {
    setInputValue(current);
  }, [current]);

  return (
    <div className="fixed bottom-0 flex h-max w-full justify-center bg-opacity-20 from-gray-600  to-gray-50 py-3 dark:bg-[#252c33]">
      <div className="flex h-6 w-max items-center gap-2">
        <Link
          className={cx(
            (current === '1' || !current) && 'pointer-events-none opacity-50',
            'flex h-8 w-9 items-center justify-center rounded-lg bg-sky-800',
          )}
          href={q ? `?q=${q}&page=${prev}` : `?page=${prev}`}
          aria-disabled={true}
        >
          <ArrowLeft className="h-7 w-7 fill-[#f0f0f0]" />
        </Link>

        <form
          className="h-8 w-9 rounded-lg border-2 border-gray-300"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="flex h-full w-full justify-center rounded-md bg-[#f0f0f0] text-center dark:text-gray-800"
            type="number"
            name=""
            id=""
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>

        <Link
          className={cx(
            !isNext && 'pointer-events-none opacity-50',
            'flex h-8 w-9 items-center justify-center rounded-lg bg-sky-800',
          )}
          href={q ? `?q=${q}&page=${next}` : `?page=${next}`}
        >
          <ArrowRight className="h-7 w-7 fill-[#f0f0f0]" />
        </Link>
      </div>
    </div>
  );
}
