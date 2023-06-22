"use client"

import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import LogoutIcon from './icons/logout';
import GroupIcon from './icons/group';

import React from 'react';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Nav = () => {
  const pathname = usePathname()
  const [user] = useAuthState(auth);
  return (
    user && (
      <div className='p-10 flex justify-between items-center'>
        <h1 className='hidden md:block text-2xl font-bold'>
          <Link href="/" className='hover:underline hover:underline-offset-4'>{user?.displayName}</Link> {pathname !== "/" && `/ ${pathname.substring(1)} data`}
        </h1>
        <Image className="md:hidden rounded-full" src={user?.photoURL} alt="User photo" width={48} height={48}/>
        <div className='flex gap-10 items-center'>
          {false && <GroupIcon className="h-6 fill-neutral-700 dark:fill-neutral-200 hover:cursor-pointer hover:fill-neutral-950 dark:hover:fill-neutral-50 transition-all ease-in-out duration-500"/>}
          <button onClick={() => auth.signOut()}>
            <LogoutIcon className="dark:fill-neutral-200 h-6 hover:cursor-pointer hover:fill-neutral-950 dark:hover:fill-neutral-50 transition-all ease-in-out duration-500"/>
          </button>
        </div>
      </div>
    )
  )
}
