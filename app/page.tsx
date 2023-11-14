import Image from 'next/image';
import { home } from '../constants/home';
import crawl from '@/controller/crawl';
import Link from 'next/link';
import NullPage from '@/components/null-page';
import Pagination from '@/components/pagination';
import { redirect } from 'next/navigation';

export default async function Home({
  params,
  searchParams,
}: {
  params: { cat: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  redirect('/danh-sach/truyen-full');

  return <NullPage />;
}
