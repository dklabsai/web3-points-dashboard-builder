
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, sepolia, polygonMumbai } from 'wagmi/chains';

// v1 wagmi setup
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, sepolia, polygonMumbai],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({ appName: 'dklabs.io', chains });
export const wagmiClient = createClient({ autoConnect: true, connectors, provider, webSocketProvider });

export { chains, WagmiConfig, RainbowKitProvider, darkTheme };
