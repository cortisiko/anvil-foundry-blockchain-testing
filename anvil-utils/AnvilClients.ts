import { createPublicClient, createWalletClient, http } from "viem";
import { CUSTOM_CHAIN,ANVIL_CONFIG } from "./config";

/**
 * Creates anvil clients for the custom chain.
 * Read more about viem here: https://viem.sh/docs/clients/intro
 * @returns The public and wallet clients
 */


function CreateAnvilClients() {
  const publicClient = createPublicClient({
    chain: CUSTOM_CHAIN,
    transport: http(`http://localhost:${ANVIL_CONFIG.port}`),
  });

  const walletClient = createWalletClient({
    chain: CUSTOM_CHAIN,
    transport: http(`http://localhost:${ANVIL_CONFIG.port}`),
  });

  return { publicClient, walletClient };
}

export { CreateAnvilClients };
