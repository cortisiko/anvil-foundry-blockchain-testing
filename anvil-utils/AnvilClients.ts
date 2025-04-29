import { createPublicClient, createTestClient, createWalletClient, http } from "viem";
import { CUSTOM_CHAIN,ANVIL_CONFIG } from "./config";
import { mnemonicToAccount } from 'viem/accounts'
let srp = "busy ahead magic token piece year steak scale deliver sock noble mandate"

const account = mnemonicToAccount(srp)
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
    account,
    chain: CUSTOM_CHAIN,
    transport: http(`http://localhost:${ANVIL_CONFIG.port}`),
  });

  const testClient = createTestClient({
    chain: CUSTOM_CHAIN,
    mode: 'anvil',
    transport: http(`http://localhost:${ANVIL_CONFIG.port}`),
  });

  return { publicClient, walletClient, testClient };
}

export { CreateAnvilClients };
