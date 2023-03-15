import { NetworkName } from "../interface";

export interface Network {
  networkName: NetworkName;
  chainName: string;
  chainId: number;
  rpcUrls: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls?: string[];
}

export const getNetworkNameByChainId = (chainId: number): NetworkName => {
  const network: Network | undefined = Object.values(SupportedNetworks).find(
    (network: Network) => network.chainId === chainId
  );

  if (!network) {
    console.warn("Network detection failed!", chainId);
    return "unknown";
  }

  return network.networkName;
};

// bsc
const bsc: Network = {
  networkName: "bsc",
  chainName: "Binance Smart Chain",
  chainId: 56,
  rpcUrls: ["https://endpoints.omniatech.io/v1/bsc/mainnet/public"],
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
};
const bsctest: Network = {
  networkName: "bsctest",
  chainName: "Binance Smart Chain Testnet",
  chainId: 97,
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  nativeCurrency: {
    name: "tBNB",
    symbol: "tBNB",
    decimals: 18,
  },
};

// celo
const celo: Network = {
  networkName: "celo",
  chainName: "Celo",
  chainId: 42220,
  rpcUrls: ["https://forno.celo.org"],
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  blockExplorerUrls: ["https://celoscan.io"],
};
const alfajores: Network = {
  networkName: "alfajores",
  chainName: "Alfajores Network",
  chainId: 44787,
  rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
  nativeCurrency: {
    name: "CELO",
    symbol: "CELO",
    decimals: 18,
  },
  blockExplorerUrls: ["https://alfajores.celoscan.io"],
};

// polygon
const polygon: Network = {
  networkName: "polygon",
  chainName: "Polygon Mainnet",
  chainId: 137,
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC", // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"],
};
const mumbai: Network = {
  networkName: "mumbai",
  chainName: "Mumbai Testnet",
  chainId: 80001,
  nativeCurrency: {
    name: "tMATIC",
    symbol: "tMATIC", // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ["https://polygon-testnet-rpc.allthatnode.com:8545"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

// ethereum
const ethereum: Network = {
  networkName: "ethereum",
  chainName: "Ethereum Mainnet",
  chainId: 1,
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH", // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ["https://rpc.ankr.com/eth"],
  blockExplorerUrls: ["https://etherscan.io"],
};
const goerli: Network = {
  networkName: "goerli",
  chainName: "Goerli Testnet",
  chainId: 5,
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH", // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
  blockExplorerUrls: ["https://goerli.etherscan.io"],
};

// base
const basegoerli: Network = {
  networkName: "basegoerli",
  chainName: "Base Goerli Testnet",
  chainId: 84531,
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH", // 2-6 characters long
    decimals: 18,
  },
  rpcUrls: ["https://goerli.base.org"],
  blockExplorerUrls: ["https://goerli.basescan.org"],
};

export const SupportedNetworks: Partial<{
  [key in NetworkName]: Network;
}> = {
  // ETH
  ethereum,
  goerli,
  mainnet: ethereum,
  // BSC
  bsc,
  bsctest,
  // Polygon
  polygon,
  mumbai,
  // celo
  celo,
  alfajores,
  // base
  basegoerli,
};