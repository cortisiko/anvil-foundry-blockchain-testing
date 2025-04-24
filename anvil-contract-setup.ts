import { createAnvil } from "@viem/anvil";
import { createPublicClient, createWalletClient, http } from "viem";
import { foundry } from "viem/chains";
import { CreateAnvilClients } from "./anvil-setup-scripts/AnvilClients";

interface AccountWithBalance {
  address: `0x${string}`;
  balance: string;
}

class AnvilManager {
  private anvil;
  private options = {
    forkUrl: "https://mainnet.base.org",
    forkBlockNumber: 29285448,
    chainId: 1337,
    port: 8545
  };

  constructor() {
    this.anvil = createAnvil(this.options);
  }

  async start() {
    console.log("Starting Anvil...");
    await this.anvil.start();
    console.log("Anvil is running. Press Ctrl+C to stop.");
  }

  async getAccounts(): Promise<AccountWithBalance[]> {
    const publicClient = createPublicClient({
      chain: foundry,
      transport: http(`http://localhost:${this.options.port}`)
    });

    const walletClient = createWalletClient({
      chain: foundry,
      transport: http(`http://localhost:${this.options.port}`)
    });

    // Get all accounts from the wallet client
    const accounts = await walletClient.getAddresses();

    // Get balances for all accounts
    const accountsWithBalances = await Promise.all(
      accounts.map(async (address) => {
        const balance = await publicClient.getBalance({ address });
        return {
          address,
          balance: balance.toString()
        };
      })
    );

    return accountsWithBalances;
  }

  async getProvider() {
    const { publicClient, walletClient } = CreateAnvilClients({ port: this.options.port });
    return { publicClient, walletClient };
  }

  async getBlockerNumber(): Promise<BigInt> {
    const { publicClient } = await this.getProvider();
    let blockNumber = await publicClient.getBlockNumber();
    return blockNumber;
  }

  async stop() {
    console.log("Stopping Anvil...");
    await this.anvil.stop();
  }
}

async function main() {
  const anvilManager = new AnvilManager();
  await anvilManager.start();

  // Get and display all accounts with balances
  // const accounts = await anvilManager.getAccounts();
    const accounts = await anvilManager.getBlockerNumber();

  console.log(accounts)
  // console.log("All accounts on the network:");
  // accounts.forEach((account: AccountWithBalance, index: number) => {
  //   console.log(`${index + 1}. Address: ${account.address}`);
  //   console.log(`   Balance: ${account.balance} wei`);
  //   console.log("------------------------");
  // });
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    await anvilManager.stop();
    process.exit(0);
  });
}

main().catch(console.error);