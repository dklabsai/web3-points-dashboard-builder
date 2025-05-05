
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Configure chains for mainnet, sepolia, and polygonMumbai
const { chains, publicClient } = configureChains(
  [mainnet, sepolia, polygonMumbai],
  [publicProvider()]
);

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Setup wallet connectors
const { connectors } = getDefaultWallets({
  appName: 'dklabs.io',
  projectId,
  chains
});

// Create Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains, RainbowKitProvider, darkTheme };
