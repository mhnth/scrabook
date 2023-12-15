'use client';

import { UIProvider } from '@/components/useUI';
import '../styles/globals.css';
import Navbar from '@/components/navbar';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UIProvider>
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
    </UIProvider>
  );
}
