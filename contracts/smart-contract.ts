import { hstBytecode, hstAbi } from "./smart-contract-constants.json";
import { CreateAnvilClients } from "../anvil-utils/AnvilClients";
import { AnvilManager } from "../anvil-contract-setup";

const hstFactory = {
  initialAmount: 10,
  tokenName: "CurtToken",
  decimalUnits: 4,
  tokenSymbol: "CURT",
  bytecode: hstBytecode,
  abi: hstAbi,
};

async function deployContract(anvilManager: AnvilManager) {
  const { walletClient, publicClient } = CreateAnvilClients({
    port: anvilManager.port,
  });
  const accountOne = await anvilManager.getFirstAccount();
  // console.log("Deploying from account:", accountOne);

  const hash = await walletClient.deployContract({
    account: accountOne,
    abi: hstFactory.abi,
    bytecode: hstFactory.bytecode as `0x${string}`,
    args: [
      hstFactory.initialAmount,
      hstFactory.tokenName,
      hstFactory.decimalUnits,
      hstFactory.tokenSymbol,
    ],
  });
  // console.log("Deployment transaction hash:", hash);

  // Wait for the transaction to be mined
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  // console.log("Transaction receipt:", receipt);

  if (!receipt.contractAddress) {
    throw new Error(
      "Contract deployment failed - no contract address in receipt"
    );
  }

  console.log("Contract deployed at address:", receipt.contractAddress);
  return receipt.contractAddress;
}

export { deployContract };
