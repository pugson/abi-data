type ChainSpec = {
  hostname: string;
  key: string | undefined;
};

// The supported chains, alphabetically sorted. We use the same chain names as wagmi.
// See https://github.com/wagmi-dev/references/tree/main/packages/chains#chains
const chains = {
  avalanche: { hostname: 'api.snowtrace.io', key: process.env.SNOWTRACE_API_KEY },
  avalancheFuji: { hostname: 'api-testnet.snowtrace.io', key: process.env.SNOWTRACE_API_KEY },
  arbitrum: { hostname: 'api.arbiscan.io', key: process.env.ARBISCAN_API_KEY },
  arbitrumGoerli: { hostname: 'api-testnet.arbiscan.io', key: process.env.ARBISCAN_API_KEY },
  arbitrumNova: { hostname: 'api-nova.arbiscan.io', key: process.env.ARBISCAN_API_KEY },
  base: { hostname: 'api.basescan.org', key: process.env.BASESCAN_API_KEY },
  baseGoerli: { hostname: 'api-goerli.basescan.org', key: process.env.BASESCAN_API_KEY },
  bsc: { hostname: 'api.bscscan.com', key: process.env.BSCSCAN_API_KEY },
  bscTestnet: { hostname: 'api-testnet.bscscan.com', key: process.env.BSCSCAN_API_KEY },
  fantom: { hostname: 'api.ftmscan.com', key: process.env.FTMSCAN_API_KEY },
  fantomTestnet: { hostname: 'api-testnet.ftmscan.com', key: process.env.FTMSCAN_API_KEY },
  goerli: { hostname: 'api-goerli.etherscan.io', key: process.env.ETHERSCAN_API_KEY },
  mainnet: { hostname: 'api.etherscan.io', key: process.env.ETHERSCAN_API_KEY },
  polygon: { hostname: 'api.polygonscan.com', key: process.env.POLYGONSCAN_API_KEY },
  polygonMumbai: { hostname: 'api-testnet.polygonscan.com', key: process.env.POLYGONSCAN_API_KEY },
  polygonZkEvm: { hostname: 'api-zkevm.polygonscan.com', key: process.env.POLYGONSCAN_ZKEVM_API_KEY },
  polygonZkEvmTestnet: { hostname: 'api-testnet-zkevm.polygonscan.com', key: process.env.POLYGONSCAN_ZKEVM_API_KEY },
  optimism: { hostname: 'api-optimistic.etherscan.io', key: process.env.ETHERSCAN_OP_API_KEY },
  optimismGoerli: { hostname: 'api-goerli-optimism.etherscan.io', key: process.env.ETHERSCAN_OP_API_KEY },
  sepolia: { hostname: 'api-sepolia.etherscan.io', key: process.env.ETHERSCAN_API_KEY },
} satisfies Record<string, ChainSpec>;

export type ChainId = keyof typeof chains;

export default chains;
