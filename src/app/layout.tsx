import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import NavWallet from '../components/wallet/nav-wallet';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
      <NavWallet />
        <AppWrappers>
            {children}
          </AppWrappers>
      </body>
    </html>
  );
}
