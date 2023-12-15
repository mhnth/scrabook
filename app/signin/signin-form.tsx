'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Spinner } from '@/components/spinner';

interface SignInFormProps {}

export const SignInForm: React.FC<SignInFormProps> = ({}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isPending, startTransition] = useTransition();

  const hdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (err) {
      console.log('Error while logging in:', err);
    }
  };
  return (
    <div
      className="border- mx-auto mt-12 w-full max-w-sm 
      rounded-2xl border-amber-500 border-opacity-30 p-6 px-12"
    >
      <div className="text-center text-xl">Đăng nhập</div>
      <form
        action=""
        method="post"
        className="form mt-6"
        onSubmit={(e) => startTransition(() => hdSubmit(e))}
      >
        <div className="form_input">
          <input
            className="m_input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="form_input">
          <input
            className="m_input"
            type="password"
            name="password"
            placeholder="**********"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div className="mt-4 text-sm text-sky-700">Quên mật khẩu?</div>
        <button type="submit" className="form_btn mt-4">
          {isPending ? <Spinner /> : 'Đăng nhập'}
        </button>
      </form>
      <div className="form_more">
        <Link href={'/signup'}>Tạo tài khoản</Link>
      </div>
    </div>
  );
};
