import { createPublicClient, createWalletClient, http } from "viem";
import { CUSTOM_CHAIN } from "./config";

/**
 * Creates anvil clients for the custom chain.
 * Read more about viem here: https://viem.sh/docs/clients/intro
 * @param port - The port number of the anvil node
 * @returns The public and wallet clients
 */


function CreateAnvilClients({ port }: { port: number }) {
  const publicClient = createPublicClient({
    chain: CUSTOM_CHAIN,
    transport: http(`http://localhost:${port}`),
  });

  const walletClient = createWalletClient({
    chain: CUSTOM_CHAIN,
    transport: http(`http://localhost:${port}`),
  });

  return { publicClient, walletClient };
}

export { CreateAnvilClients };
