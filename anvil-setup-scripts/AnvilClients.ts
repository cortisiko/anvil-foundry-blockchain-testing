import { createPublicClient, createWalletClient, http } from "viem";
import { CUSTOM_CHAIN } from "./config";

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