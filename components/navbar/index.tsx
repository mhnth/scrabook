'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '../../app/logo.png';
import Search from './search';
import ISearch from '../icons/search';
import IAvatar from '../icons/avatar';
import { getCurrentUser, getSession } from '@/lib/session';
import env from '@/config/env';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  // const user = await getSession();
  // console.log('env', env.nextAuthSecret);
  const { data: session } = useSession();

  console.log('get session', session);

  return (
    <nav
      className="page-w relative mx-auto flex items-center justify-between 
      py-1 dark:border-b dark:border-slate-500"
    >
      <div className="">
        <Link
          className="flex items-center gap-2 font-semibold text-slate-300"
          href={'/'}
        >
          <img
            loading="lazy"
            className="w-8 md:w-10"
            src={Logo.src}
            alt="logo"
          />
          <span className="hidden md:block">Scrabook</span>
        </Link>
      </div>
      <div className="flex gap-1">
        <span
          className="search-icon cursor-pointer"
          onClick={(e) => {
            setOpenSearchBar(!openSearchBar);
          }}
        >
          <ISearch className="search-icon" />
        </span>
        <Link href={'/signin'}>
          <IAvatar />
        </Link>
      </div>
      {openSearchBar && <Search setOpenSearchBar={setOpenSearchBar} />}
    </nav>
  );
}
