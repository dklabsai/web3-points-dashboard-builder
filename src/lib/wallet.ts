
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, sepolia, polygonMumbai } from 'wagmi/chains';

// v1 wagmi setup with createConfig
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'dklabs.io',
  projectId: 'YOUR_PROJECT_ID', // Required for RainbowKit v2+
  chains
});

export const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

export { chains, WagmiConfig, RainbowKitProvider, darkTheme };
