import { AnvilManager } from "./anvil-utils/anvilManager";
import { deployContract } from "./contracts/smart-contract";

async function main() {
  const anvilManager = new AnvilManager();
  await anvilManager.start();

    const accounts = await anvilManager.getBlockerNumber();
    const accountOne = await anvilManager.getFirstAccount();

  // console.log(accounts)
  // console.log(accountsWithBalances)
  console.log("Account One:")
  console.log(accountOne)
  console.log("Setting balance")
  await anvilManager.setBalance();
  
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