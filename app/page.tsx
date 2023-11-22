import NullPage from '@/components/null-page';
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
