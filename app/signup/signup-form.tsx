'use client';

import React, { useState, useTransition } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from '@/components/spinner';

interface SignUpFormProps {}

export const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const hdSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    console.log('sign up', data);

    axios
      .post('/api/signup', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    // .finally(() => router.push('/'));
  };
  return (
    <div
      className="border- mx-auto mt-12 w-full max-w-sm 
      rounded-2xl border-amber-500 border-opacity-30 p-6 px-12"
    >
      <div className="text-center text-xl">Tạo tài khoản</div>
      <form
        action=""
        method="post"
        className="form mt-6"
        onSubmit={(e) => startTransition(() => hdSignUpSubmit(e))}
      >
        <div className="form_input">
          <input
            className="m_input"
            type="text"
            name="name"
            placeholder="Username"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
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
        <button type="submit" className="form_btn mt-8">
          {isPending ? <Spinner /> : 'Tạo tài khoản'}
        </button>
      </form>
      <div className="form_more">
        <Link href={'/signin'}>Đăng nhập</Link>
      </div>
    </div>
  );
};
