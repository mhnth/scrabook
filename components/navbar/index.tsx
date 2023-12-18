'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '../../app/logo.png';
import Search from './search';
import ISearch from '../icons/search';
import IAvatar from '../icons/avatar';
import { useSession } from 'next-auth/react';
import { useUI } from '../useUI';

export default function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  const { data: session } = useSession();
  const { openModal } = useUI();

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
      <div className="flex items-center gap-1">
        <span
          className="search-icon cursor-pointer"
          onClick={(e) => {
            setOpenSearchBar(!openSearchBar);
          }}
        >
          <ISearch className="search-icon" />
        </span>
        {session ? (
          <div className="cursor-pointer" onClick={() => openModal()}>
            <img
              className="h-7 w-7 rounded-full"
              src={
                session.user?.image ||
                'https://i.pinimg.com/736x/40/29/74/402974f43eaa5f89d40e709f5db19a5d.jpg'
              }
              alt=""
            />
          </div>
        ) : (
          <Link href={'/signin'}>
            <IAvatar />
          </Link>
        )}
      </div>
      {openSearchBar && <Search setOpenSearchBar={setOpenSearchBar} />}
    </nav>
  );
}
