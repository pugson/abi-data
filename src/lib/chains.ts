export type ChainSpec = {
  hostname: string;
  key: string | undefined;
  label: string;
  id: string;
};

// The supported chains, alphabetically sorted. We use the same chain names as wagmi.
// See https://github.com/wagmi-dev/references/tree/main/packages/chains#chains
export const chains = {
  avalanche: {
    hostname: "api.snowtrace.io",
    key: process.env.SNOWTRACE_API_KEY,
    label: "Avalanche Mainnet",
    id: "avalanche",
  },
  avalancheFuji: {
    hostname: "api-testnet.snowtrace.io",
    key: process.env.SNOWTRACE_API_KEY,
    label: "Avalanche Fuji Testnet",
    id: "avalancheFuji",
  },
  arbitrum: {
    hostname: "api.arbiscan.io",
    key: process.env.ARBISCAN_API_KEY,
    label: "Arbitrum Mainnet",
    id: "arbitrum",
  },
  arbitrumGoerli: {
    hostname: "api-testnet.arbiscan.io",
    key: process.env.ARBISCAN_API_KEY,
    label: "Arbitrum Goerli Testnet",
    id: "arbitrumGoerli",
  },
  arbitrumNova: {
    hostname: "api-nova.arbiscan.io",
    key: process.env.ARBISCAN_API_KEY,
    label: "Arbitrum Nova",
    id: "arbitrumNova",
  },
  base: { hostname: "api.basescan.org", key: process.env.BASESCAN_API_KEY, label: "Base Mainnet", id: "base" },
  baseGoerli: {
    hostname: "api-goerli.basescan.org",
    key: process.env.BASESCAN_API_KEY,
    label: "Base Goerli Testnet",
    id: "baseGoerli",
  },
  bsc: { hostname: "api.bscscan.com", key: process.env.BSCSCAN_API_KEY, label: "BSC Mainnet", id: "bsc" },
  bscTestnet: {
    hostname: "api-testnet.bscscan.com",
    key: process.env.BSCSCAN_API_KEY,
    label: "BSC Testnet",
    id: "bscTestnet",
  },
  fantom: { hostname: "api.ftmscan.com", key: process.env.FTMSCAN_API_KEY, label: "Fantom Mainnet", id: "fantom" },
  fantomTestnet: {
    hostname: "api-testnet.ftmscan.com",
    key: process.env.FTMSCAN_API_KEY,
    label: "Fantom Testnet",
    id: "fantomTestnet",
  },
  goerli: {
    hostname: "api-goerli.etherscan.io",
    key: process.env.ETHERSCAN_API_KEY,
    label: "Ethereum Goerli Testnet",
    id: "goerli",
  },
  mainnet: {
    hostname: "api.etherscan.io",
    key: process.env.ETHERSCAN_API_KEY,
    label: "Ethereum Mainnet",
    id: "mainnet",
  },
  polygon: {
    hostname: "api.polygonscan.com",
    key: process.env.POLYGONSCAN_API_KEY,
    label: "Polygon Mainnet",
    id: "polygon",
  },
  polygonMumbai: {
    hostname: "api-testnet.polygonscan.com",
    key: process.env.POLYGONSCAN_API_KEY,
    label: "Polygon Mumbai Testnet",
    id: "polygonMumbai",
  },
  polygonZkEvm: {
    hostname: "api-zkevm.polygonscan.com",
    key: process.env.POLYGONSCAN_ZKEVM_API_KEY,
    label: "Polygon zkEVM Mainnet",
    id: "polygonZkEvm",
  },
  polygonZkEvmTestnet: {
    hostname: "api-testnet-zkevm.polygonscan.com",
    key: process.env.POLYGONSCAN_ZKEVM_API_KEY,
    label: "Polygon zkEVM Testnet",
    id: "polygonZkEvmTestnet",
  },
  optimism: {
    hostname: "api-optimistic.etherscan.io",
    key: process.env.ETHERSCAN_OP_API_KEY,
    label: "Optimism Mainnet",
    id: "optimism",
  },
  optimismGoerli: {
    hostname: "api-goerli-optimism.etherscan.io",
    key: process.env.ETHERSCAN_OP_API_KEY,
    label: "Optimism Goerli Testnet",
    id: "optimismGoerli",
  },
  sepolia: {
    hostname: "api-sepolia.etherscan.io",
    key: process.env.ETHERSCAN_API_KEY,
    label: "Ethereum Sepolia Testnet",
    id: "sepolia",
  },
  gnosis: {
    hostname: "api.gnosisscan.io",
    key: process.env.GNOSISSCAN_API_KEY,
    label: "Gnosis Mainnet",
    id: "gnosis",
  },
} satisfies Record<string, ChainSpec>;

export type ChainId = keyof typeof chains;
