'use client';

import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { useSDK } from '@metamask/sdk-react';
import { FaWallet } from 'react-icons/fa';

export const ConnectMetamaskWalletButton = () => {
  const formatAddress = (addr: string | undefined) => {
    return `${addr?.substring(0, 8)}...`;
  };
  const { sdk, connected, connecting, account } = useSDK();
  const toast = useToast();

  const connect = async () => {
    try {
      await sdk?.connect();
      toast({
        title: 'Wallet Connected',
        description: `Connected to ${formatAddress(account)}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.warn('No accounts found', err);
      toast({
        title: 'Connection Failed',
        description: 'Unable to connect to MetaMask.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      toast({
        title: 'Wallet Disconnected',
        description: 'You have disconnected your wallet.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      {connected ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaWallet />}
            colorScheme="blue"
            variant="solid"
          >
            {formatAddress(account)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={disconnect} color="red.500">
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          isLoading={connecting}
          onClick={connect}
          leftIcon={<FaWallet />}
          colorScheme="blue"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectMetamaskWalletButton;