'use client';

import Link from 'next/link';
import { MetaMaskProvider } from '@metamask/sdk-react';
import ConnectTronWalletButton from './connect-tron';
import ConnectMetamaskWalletButton from './connect-metamask';

export const NavWallet = () => {
  const host =
    typeof window !== 'undefined' ? window.location.host : 'defaultHost';

  const sdkOptions = {
    logging: { developerMode: true },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: 'Next-Metamask-Boilerplate',
      url: host // using the host constant defined above
    }
  };

  return (
    <nav className='mx-auto flex max-w-screen-xl items-center justify-between rounded-xl px-6 py-7'>
      <Link href='/crypto-values' className='text-2xl font-bold'>
        Crypto Values
      </Link>

      <div className='ml-auto flex-col items-center space-y-4'>
        <MetaMaskProvider debug={true} sdkOptions={sdkOptions}>
          <ConnectMetamaskWalletButton />
        </MetaMaskProvider>
        <ConnectTronWalletButton />
      </div>
    </nav>
  );
};

export default NavWallet;
