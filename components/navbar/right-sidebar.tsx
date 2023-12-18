import { signOut } from 'next-auth/react';
import ISignOut from '../icons/logout';

export const RightSideBar = () => {
  return (
    <div className="absolute right-0 h-screen w-10/12 max-w-xs border-l-[1px] border-slate-600 border-opacity-50 bg-white px-2 py-2 dark:bg-[#262d3b]">
      <div onClick={() => signOut()} className="flex cursor-pointer gap-1">
        <span>
          <ISignOut />
        </span>
        <span>Log Out</span>
      </div>
    </div>
  );
};
