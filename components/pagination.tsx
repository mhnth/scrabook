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
    <div className="fixed bottom-0 mt-8 flex w-full justify-center bg-[#252c33] bg-opacity-25">
      <div className="flex w-max items-center gap-2">
        <Link
          className={cx(
            (current === '1' || !current) && 'pointer-events-none opacity-50',
          )}
          href={q ? `?q=${q}&page=${prev}` : `?page=${prev}`}
          aria-disabled={true}
        >
          <ArrowLeft className="h-8 w-8" />
        </Link>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="flex w-12 justify-center rounded-md bg-gray-600 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            name=""
            id=""
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
        <Link
          className={cx(!isNext && 'pointer-events-none opacity-50')}
          href={q ? `?q=${q}&page=${next}` : `?page=${next}`}
        >
          <ArrowRight className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}
