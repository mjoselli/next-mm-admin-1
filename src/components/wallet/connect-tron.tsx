'use client';

import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';
import { FaWallet } from 'react-icons/fa';

export const ConnectTronWalletButton = () => {
  const formatAddress = (addr: string | undefined) => {
    return `${addr?.substring(0, 8)}...`;
  };
  const [trxBalance, setTrxBalance] = useState(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [walletName, setWalletName] = useState<string>('');
  const toast = useToast();

  const connectToWallet = useCallback(async (): Promise<boolean> => {
    if (window.tronLink) {
      await window.tronLink.request({ method: 'tron_requestAccounts' });
    }

    if (!window.tronWeb) {
      toast({
        title: 'Connection Failed',
        description: 'TronWeb is not available.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    const { name, base58 } = window.tronWeb.defaultAddress;

    if (base58) {
      setAddress(base58);
      setWalletName(name || '');
      setIsConnected(true);

      const trxAmount = await window.tronWeb.trx.getBalance(base58);
      setTrxBalance(trxAmount);

      toast({
        title: 'Wallet Connected',
        description: `Connected to ${formatAddress(base58)}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return true;
    }

    setIsConnected(false);
    return false;
  }, [toast]);

  const cleanData = useCallback(() => {
    setTrxBalance(0);
    setIsConnected(false);
    setAddress('');
    setWalletName('');
    toast({
      title: 'Wallet Disconnected',
      description: 'You have disconnected your wallet.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  useEffect(() => {
    const handleMessage = async (msg: MessageEvent) => {
      const { message } = msg.data;

      if (!message) return;

      if (
        message.action === 'setAccount' ||
        message.action === 'setNode' ||
        message.action === 'tabReply' ||
        message.action === 'accountsChanged'
      ) {
        if (message.data.address) {
          connectToWallet();
        }

        if (message.action !== 'tabReply' && !message.data.address) {
          cleanData();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [connectToWallet, cleanData]);

  return (
    <div>
      {isConnected ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaWallet />}
            colorScheme="blue"
            variant="solid"
          >
            {formatAddress(address)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={cleanData} color="red.500">
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={connectToWallet} colorScheme="blue">
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default ConnectTronWalletButton;