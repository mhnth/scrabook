'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '../../app/logo.png';
import Search from './search';
import ISearch from '../icons/search';

export default function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);

  return (
    <nav className="page-w relative mx-auto flex items-center justify-between py-1 dark:border-b dark:border-slate-500">
      <div className="w-max">
        <Link
          className="flex items-center gap-2 font-semibold text-slate-300"
          href={'/'}
        >
          <img className="w-8 md:w-10" src={Logo.src} alt="logo" />
          <span className="hidden md:block">Scrabook</span>
        </Link>
      </div>
      <span
        className="search-icon cursor-pointer"
        onClick={(e) => {
          setOpenSearchBar(!openSearchBar);
        }}
      >
        <ISearch className="search-icon" />
      </span>
      {openSearchBar && <Search setOpenSearchBar={setOpenSearchBar} />}
    </nav>
  );
}
