import { createAnvil } from "@viem/anvil";
import { CreateAnvilClients } from "./anvil-setup-scripts/AnvilClients";
import { deployContract } from "./smart-contract";
import { ANVIL_CONFIG } from "./anvil-setup-scripts/config";

interface AccountWithBalance {
  address: `0x${string}`;
  balance: string;
}

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
    const { publicClient, walletClient } = CreateAnvilClients({ port: this.port });
    return { publicClient, walletClient };
  }

  async getBlockerNumber(): Promise<BigInt> {
    const { publicClient } = await this.getProvider();
    let blockNumber = await publicClient.getBlockNumber();
    return blockNumber;
  }
  async getFirstAccount(): Promise<`0x${string}`> {
    const {walletClient} = await this.getProvider();
    const accounts = await walletClient.getAddresses();
    return accounts[0]
  }

  async stop() {
    console.log("Stopping Anvil...");
    await this.anvil.stop();
  }
}

async function main() {
  const anvilManager = new AnvilManager();
  await anvilManager.start();

    const accounts = await anvilManager.getBlockerNumber();
    const accountOne = await anvilManager.getFirstAccount();

  // console.log(accounts)
  // console.log(accountsWithBalances)
  console.log("Account One:")
  console.log(accountOne)

  const deployedContract = await deployContract(anvilManager);
  console.log("Contract Address:", deployedContract);
  // console.log("Anvil Logs:", anvilManager.logs);
 
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    await anvilManager.stop();
    process.exit(0);
  });
}

main().catch(console.error);

export { AnvilManager };