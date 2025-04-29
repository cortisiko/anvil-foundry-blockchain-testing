import { createAnvil } from "@viem/anvil";
import { CreateAnvilClients } from "./AnvilClients";
import { ANVIL_CONFIG } from "./config";

/**
 * Manages the Anvil blockchain node.
 */

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

  /**
   * Starts the Anvil blockchain node.
   */
  async start() {
    console.log("Starting Anvil...");
    await this.anvil.start();
    console.log("Anvil is running. Press Ctrl+C to stop.");
  }

  /**
   * Gets the Anvil clients.
   * @returns The public and wallet clients
   */
  async getProvider() {
    const { publicClient, walletClient, testClient } = CreateAnvilClients();
    return { publicClient, walletClient, testClient };
  }

  /**
   * Gets the current block number.
   * @returns The current block number
   */
  async getBlockerNumber(): Promise<BigInt> {
    const { publicClient } = await this.getProvider();
    let blockNumber = await publicClient.getBlockNumber();
    return blockNumber;
  }

  /**
   * Gets the first account.
   * @returns The first account
   */
  async getFirstAccount(): Promise<`0x${string}`> {
    const { walletClient } = await this.getProvider();
    const accounts = await walletClient.getAddresses();
    return accounts[0];
  }

  async setBalance() {
    const { testClient, publicClient } = await this.getProvider();
    const account = await this.getFirstAccount();
    
    if (!account) throw new Error("No account available");
    const balanceInWei = BigInt('0x100000000000000000000');

    await testClient.setBalance({ 
      address: account,
      value: balanceInWei
    });
    const balance = await publicClient.getBalance({ address: account });
    console.log("Balance set to 1000000000000000000n", balance);
  }

  /**
   * Stops the Anvil blockchain node.
   */
  async stop() {
    console.log("Stopping Anvil...");
    await this.anvil.stop();
  }
}
export { AnvilManager };
