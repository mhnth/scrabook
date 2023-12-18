'use client';

import { UIProvider, useUI } from '@/components/useUI';
import '../styles/globals.css';
import { Modal, ModalUI } from '@/components/modal';
import { RightSideBar } from '@/components/navbar/right-sidebar';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UIProvider>
      <ModalUI />
      {children}
    </UIProvider>
  );
}
