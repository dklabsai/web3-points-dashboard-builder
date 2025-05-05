
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { 
  http, 
  createConfig,
} from 'wagmi';
import { mainnet, sepolia, polygonMumbai } from 'wagmi/chains';

// Configure chains for mainnet, sepolia, and polygonMumbai
const chains = [mainnet, sepolia, polygonMumbai];

// Setup public client with HTTP provider
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Setup wallet connectors
const { connectors } = getDefaultWallets({
  appName: 'dklabs.io',
  projectId,
  chains
});

// Create Wagmi config with HTTP transport
export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
  },
  connectors,
});

export { chains, RainbowKitProvider, darkTheme };
