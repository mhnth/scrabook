import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Logo from './logo.png';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <header>
            <nav className="page-w mx-auto border-b py-2 dark:border-slate-500">
              <div className="w-max">
                <Link
                  className="flex items-center gap-2 font-semibold text-slate-300"
                  href={'/'}
                >
                  <img className="w-8 md:w-10" src={Logo.src} alt="logo" />
                  <span className="hidden md:block">Scrabook</span>
                </Link>
              </div>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
