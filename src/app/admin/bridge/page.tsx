'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Heading } from '@chakra-ui/react';

interface Chain {
  id: number;
  name: string;
  tokenType: 'ERC-20' | 'TRC-20';
}

interface Token {
  symbol: string;
  name: string;
  type: 'ERC-20' | 'TRC-20';
}

const chains: Chain[] = [
  { id: 1, name: 'Ethereum', tokenType: 'ERC-20' },
  { id: 2, name: 'Tron', tokenType: 'TRC-20' },
];

const tokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', type: 'ERC-20' },
  { symbol: 'TRX', name: 'Tronix', type: 'TRC-20' },
];

export default function BridgePage() {
  const [fromChain, setFromChain] = useState<Chain | null>(null);
  const [toChain, setToChain] = useState<Chain | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>('');

  const handleTransfer = () => {
    if (!fromChain || !toChain || !token || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    if (fromChain.tokenType !== token.type) {
      alert(`Selected token type (${token.type}) does not match the source chain (${fromChain.name}).`);
      return;
    }

    alert(`Transferring ${amount} ${token.symbol} from ${fromChain.name} to ${toChain.name}.`);
    // Add logic to handle the actual cross-chain transfer here.
  };

  return (
    <Box maxW="500px" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" mb="6" textAlign="center">
        Bridge
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTransfer();
        }}
      >
        <FormControl mb="4">
          <FormLabel>From Chain:</FormLabel>
          <Select
            placeholder="Select Chain"
            value={fromChain?.id || ''}
            onChange={(e) =>
              setFromChain(chains.find((chain) => chain.id === Number(e.target.value)) || null)
            }
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>To Chain:</FormLabel>
          <Select
            placeholder="Select Chain"
            value={toChain?.id || ''}
            onChange={(e) =>
              setToChain(chains.find((chain) => chain.id === Number(e.target.value)) || null)
            }
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Token:</FormLabel>
          <Select
            placeholder="Select Token"
            value={token?.symbol || ''}
            onChange={(e) =>
              setToken(tokens.find((t) => t.symbol === e.target.value) || null)
            }
          >
            {tokens.map((token) => (
              <option key={token.symbol} value={token.symbol}>
                {token.name} ({token.symbol})
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Amount:</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Transfer
        </Button>
      </form>
    </Box>
  );
}