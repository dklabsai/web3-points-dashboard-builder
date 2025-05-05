
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { 
  configureChains, 
  createClient, 
  WagmiConfig 
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, sepolia, polygonMumbai } from 'wagmi/chains';

// Configure chains for mainnet, sepolia, and polygonMumbai
const { chains, provider, webSocketProvider } = configureChains(
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

// Create Wagmi client
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains, RainbowKitProvider, WagmiConfig, darkTheme };
