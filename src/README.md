
# dklabs.io - Web3 GPU Compute Platform

A dark-themed Web3 dashboard that lets users rent out their GPUs and earn points (1 pt/sec) which will later map to tokens.

## Local Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required values:
   - `VITE_WALLETCONNECT_PROJECT_ID` - Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

### Windows (PowerShell)

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

### WSL Ubuntu or Linux

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Supabase Setup

You'll need to create a Supabase project with a `users` table:

```sql
CREATE TABLE public.users (
  wallet TEXT PRIMARY KEY,
  points INTEGER DEFAULT 0,
  jobs_completed INTEGER DEFAULT 0,
  orders_fulfilled INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Smart Contract (Optional)

A sample `PointsManager.sol` contract is included that could be used with Chainlink oracles to track compute time points on-chain. To deploy:

1. Set up the contract deployment environment variables
2. Run `npm run deploy:contract` (requires additional setup with Hardhat/Foundry)

## Features

- Wallet authentication with RainbowKit (MetaMask, WalletConnect, Coinbase Wallet)
- Real-time point accrual for compute time
- Leaderboard showing top users
- Earnings estimation calculator
- Dark mode cyber aesthetic
