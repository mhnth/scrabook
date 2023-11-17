import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Scrabook',
  description: 'Web cào truyện về đọc ^^',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="scrab-app">
          <header className="sticky top-0 z-10 w-full bg-sky-900 px-2 dark:bg-[#252c33]">
            <Navbar />
          </header>
          {children}
        </div>
        <footer className="mt-8"></footer>
      </body>
    </html>
  );
}
