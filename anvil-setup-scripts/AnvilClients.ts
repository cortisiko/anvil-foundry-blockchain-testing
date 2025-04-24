import { createPublicClient, createWalletClient, http } from "viem";
import { foundry } from "viem/chains";

function CreateAnvilClients({ port }: { port: number }) {
  const publicClient = createPublicClient({
    chain: foundry,
    transport: http(`http://localhost:${port}`),
  });

  const walletClient = createWalletClient({
    chain: foundry,
    transport: http(`http://localhost:${port}`),
  });

  return { publicClient, walletClient };
}

export { CreateAnvilClients };