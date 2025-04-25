import { Chain } from "viem";

export const ANVIL_CONFIG = {
  forkUrl: "https://mainnet.base.org",
  forkBlockNumber: 29285448,
  chainId: 1338,
  port: 8546,
} as const;

export const CUSTOM_CHAIN: Chain = {
  id: ANVIL_CONFIG.chainId,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: [`http://localhost:${ANVIL_CONFIG.port}`] },
    public: { http: [`http://localhost:${ANVIL_CONFIG.port}`] },
  },
  blockExplorers: {
    default: { name: "Anvil", url: "" },
  },
  testnet: true,
} as const;
