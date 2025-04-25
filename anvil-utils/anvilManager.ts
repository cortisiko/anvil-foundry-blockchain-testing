import { createAnvil } from "@viem/anvil";
import { CreateAnvilClients } from "./AnvilClients";
import { ANVIL_CONFIG } from "./config";

class AnvilManager {
  private anvil;

  constructor() {
    this.anvil = createAnvil(ANVIL_CONFIG);
  }

  get port() {
    return ANVIL_CONFIG.port;
  }
  get logs() {
    return this.anvil.logs;
  }

  async start() {
    console.log("Starting Anvil...");
    await this.anvil.start();
    console.log("Anvil is running. Press Ctrl+C to stop.");
  }

  async getProvider() {
    const { publicClient, walletClient } = CreateAnvilClients({
      port: this.port,
    });
    return { publicClient, walletClient };
  }

  async getBlockerNumber(): Promise<BigInt> {
    const { publicClient } = await this.getProvider();
    let blockNumber = await publicClient.getBlockNumber();
    return blockNumber;
  }
  async getFirstAccount(): Promise<`0x${string}`> {
    const { walletClient } = await this.getProvider();
    const accounts = await walletClient.getAddresses();
    return accounts[0];
  }

  async stop() {
    console.log("Stopping Anvil...");
    await this.anvil.stop();
  }
}
export { AnvilManager };
