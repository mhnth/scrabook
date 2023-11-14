'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ArrowRight from './icons/arrow-right';
import ArrowLeft from './icons/arrow-left';
import { cx } from '@/lib/utils';

export default function Pagination({ current }: { current: string }) {
  const [inputValue, setInputValue] = useState<string>(current);
  const router = useRouter();
  let next = +current + 1;
  let prev = +current - 1;

  console.log('current page', current);

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
    <div className="mt-8 flex justify-center">
      <div className="flex w-max items-center gap-2">
        <Link
          className={cx(current === '1' && 'pointer-events-none')}
          href={`?page=${prev}`}
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
        <Link href={`?page=${next}`}>
          <ArrowRight className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}
