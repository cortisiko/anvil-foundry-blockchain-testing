# Anvil Foundry Testing

This is a a project to demonstrate my understanding of how to fork a chain and deploy smart contracts using Anvil (Foundry's local Ethereum node) and viem.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Foundry (for Anvil)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/cortisiko/anvil-foundry-blockchain-testing.git
cd anvil-foundry-testing
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
anvil-foundry-testing/
├── contracts/
│   ├── smart-contract.ts           # Smart contract deployment logic
│   └── smart-contract-constants.json # Contract ABI and bytecode
├── anvil-utils/
│   ├── AnvilClients.ts            # Viem client setup
│   └── AnvilManager.ts            # Anvil interface to interace with the blockchain
│   └── config.ts                  # network configuration
└── deploy-contract.ts             # script to deployment smart contract 
```

## Configuration

The project uses a shared configuration in `anvil-utils/config.ts`:
- Fork URL: Base mainnet (this is optional and any network can be forked once you specify the rpc url)
- Chain ID: 1338
- Port: 8546

## Usage

1. Deploy a contract:
```bash
yarn test-contract
```

## Custom Token Deployment

The project includes a sample ERC20 token deployment:
- Name: CurtToken
- Symbol: CURT
- Decimals: 4
- Initial Supply: 10
