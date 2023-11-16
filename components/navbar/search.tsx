'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export default function Search({
  setOpenSearchBar, // openSearchBar,
}: {
  setOpenSearchBar: Dispatch<SetStateAction<boolean>>;
  // openSearchBar: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.currentTarget as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    router.push(`/search?q=${search.value}`);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const clickedEvent = event.target as HTMLDivElement;
      if (clickedEvent.classList.contains('search-icon')) return;
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearchBar(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    <form
      ref={searchRef}
      onSubmit={onSubmit}
      className="w-max-[550px] absolute -bottom-12 right-0 w-3/5 rounded-md p-1 dark:bg-slate-700 lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Tìm kiếm truyện/tác giả"
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-slate-800 dark:text-white dark:placeholder:text-neutral-400"
      />
    </form>
  );
}
