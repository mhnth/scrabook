import type { Metadata } from 'next';
import './../styles/globals.css';
import Navbar from '@/components/navbar';
import RootLayoutClient from './layout.client';
import Provider from '@/components/session-provider';

export const runtime = 'nodejs';

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
      <body suppressHydrationWarning={true}>
        <RootLayoutClient>
          <Provider>
            <div id="_next">
              <header className="sticky top-0 z-10 w-full bg-sky-900 px-2 dark:bg-[#252c33]">
                <Navbar />
              </header>
              {children}
            </div>
          </Provider>
        </RootLayoutClient>
      </body>
    </html>
  );
}
