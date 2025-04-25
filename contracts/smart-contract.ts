import { hstBytecode, hstAbi } from "./smart-contract-constants.json";
import { CreateAnvilClients } from "../anvil-utils/AnvilClients";
import { AnvilManager } from "../deploy-contract";

/*
  This is a simple ERC20 token contract that is used to demonstrate how to deploy a contract to anvil.
  The contract is deployed to the first account in the anvil network.
  @param anvilManager - The anvil manager instance
  @returns The contract address
  */

  /*
  This is the factory object that is used to deploy the contract.
  @param initialAmount - The initial amount of the token
  @param tokenName - The name of the token
  @param decimalUnits - The number of decimal units the token has
  @param tokenSymbol - The symbol of the token
  */
const hstFactory = {
  initialAmount: 10,
  tokenName: "CurtToken",
  decimalUnits: 4,
  tokenSymbol: "CURT",
  bytecode: hstBytecode,
  abi: hstAbi,
};

/**
 * Deploys a contract to the Anvil network.
 * @param anvilManager - The Anvil manager instance
 * @returns The contract address
 */
async function deployContract(anvilManager: AnvilManager) {
  const { walletClient, publicClient } = CreateAnvilClients();
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
