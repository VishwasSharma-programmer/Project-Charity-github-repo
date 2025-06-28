# Project-Charity-github-repo
Hacksagon Project Source Code

Project Charity: A Transparent Blockchain-Based Crowdfunding Platform
📖 Overview
Project Charity is a decentralized application (DApp) built on the Ethereum blockchain that brings transparency and accountability to charitable donations. Unlike traditional charity platforms where donors have little to no say after they've donated, this project ensures that funds are only released for their intended purpose.

This is achieved by locking all donations in a smart contract. The campaign creator can only withdraw funds after creating a spending request (a "milestone") and getting approval from a majority of the donors. This creates a trustless, democratic, and transparent ecosystem for giving.

Core Features
Decentralized Campaign Creation: Anyone can start a fundraising campaign directly on the blockchain.

Transparent Donations: All donations are made via MetaMask and are publicly viewable on the Sepolia testnet.

Milestone-Based Fund Release: Funds are not released all at once. Campaign creators must request withdrawals for specific purposes, which donors must vote to approve.

Donor Governance: The people who fund the campaign have the power to approve how their money is spent.

Secure & Trustless: The rules are enforced by the smart contract, not by a central authority, removing the need for trust.

🛠️ Technology Stack
This project leverages a modern Web3 technology stack:

Solidity: The programming language used to write the smart contracts.

Ethereum (Sepolia Testnet): The blockchain network on which the DApp is deployed.

Hardhat: A professional development environment for compiling, testing, and deploying Ethereum smart contracts.

MetaMask: A browser-based crypto wallet used to interact with the DApp (donating, approving, etc.).

Ethers.js: A JavaScript library for connecting the frontend website to the Ethereum blockchain.

Node.js: A JavaScript runtime environment used for the backend setup and deployment scripts.

⚙️ How It Works
The system is built around two primary smart contracts:

CampaignFactory: This is a single, central contract whose only job is to deploy new Campaign contracts. Using a factory pattern saves on transaction costs ("gas") and keeps a clean record of all created campaigns.

Campaign: Each time a new fundraiser is started, the CampaignFactory deploys a unique Campaign contract. This new contract is responsible for:

Holding all the donated funds securely.

Keeping track of all donors.

Managing spending requests (milestones).

Handling the voting process for each spending request.

Transferring the funds to the creator if a request is approved.

🚀 Getting Started: Step-by-Step Guide
Follow these instructions to set up, deploy, and run this project on your local machine.

Prerequisites
Make sure you have the following software installed before you begin:

Node.js & npm: Download from nodejs.org

MetaMask: Install the browser extension

1. Backend Setup: Deploying the Smart Contracts
This section covers setting up the Hardhat environment and deploying the smart contracts to the Sepolia testnet.

A. Initialize the Project
Clone the repository and create the Hardhat project structure.

# Navigate to the backend folder (or create one)
cd charity-dapp-backend

# Initialize a new Hardhat project
npx hardhat

When prompted, choose "Create a JavaScript project" and accept the defaults.

B. Add the Smart Contracts

Navigate to the contracts/ folder.

Delete any sample contract files (e.g., Lock.sol).

Create a new file named Charity.sol and paste the project's smart contract code into it.

C. Configure Environment Variables
You need to provide secret keys for deployment.

Create a .env file: In the root of your charity-dapp-backend folder, create a file named exactly .env.

Add your keys: Paste the following into the .env file, replacing the placeholders with your actual keys.

# Get this from a service like Alchemy or Infura
SEPOLIA_RPC_URL="YOUR_ALCHEMY_OR_INFURA_API_URL"

# Get this from your new MetaMask account (must be 64 characters)
PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY"

🚨 SECURITY WARNING 🚨
Never share your PRIVATE_KEY or commit the .env file to a public repository. Add .env to your .gitignore file to prevent this.

D. Configure Hardhat

Open the hardhat.config.js file.

Replace its entire contents with the following code to ensure it can read your .env file and connect to Sepolia.

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { SEPOLIA_RPC_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

E. Compile and Deploy

Compile the contracts:

npx hardhat compile

Prepare the deployment script: Go to the scripts/ folder, create a file named deploy-charity.js, and add the deployment script code.

Get Free Test ETH: Deploying costs gas. Since all major faucets now require a mainnet balance, use a Proof-of-Work faucet that is free.

Recommended Faucet: https://sepolia-faucet.pk910.de/

Paste your MetaMask address and start mining. It may take a few minutes.

Deploy to Sepolia:

npx hardhat run scripts/deploy-charity.js --network sepolia

Save the Contract Address: After a successful deployment, the terminal will print the address of your CampaignFactory contract. Copy this address and save it.

2. Frontend Integration
This section covers connecting your frontend website to the deployed smart contracts.

A. Get Contract ABI
The ABI (Application Binary Interface) is a JSON file that tells your website how to interact with the contract. You will need the ABI for both CampaignFactory and Campaign.

CampaignFactory ABI: Find it at artifacts/contracts/Charity.sol/CampaignFactory.json.

Campaign ABI: Find it at artifacts/contracts/Charity.sol/Campaign.json.

In each file, copy the entire array value of the "abi" key.

B. Configure the Frontend JavaScript

In your frontend project, create a JavaScript file (e.g., app.js).

At the top of this file, create variables to hold your contract address and ABIs.

// The address you saved after deployment
const factoryAddress = "0x...YourCampaignFactoryAddress"; 

// The ABI you copied from CampaignFactory.json
const factoryABI = [ ... ]; 

// The ABI you copied from Campaign.json
const campaignABI = [ ... ]; 

Use Ethers.js to create contract instances and connect your HTML buttons to the smart contract functions (e.g., createCampaign, donate, approveRequest).

💡 Future Improvements
This project provides a solid foundation. Here are some ideas for future enhancements:

IPFS Integration: Store campaign details (like images and long descriptions) on IPFS to keep the blockchain data lightweight.

Event-Driven UI: Use event listeners (contract.on(...)) to update the UI in real-time when a new donation or vote occurs.

Enhanced UI/UX: Build out more detailed campaign pages, user profiles, and visual indicators for voting progress.

Multi-Signature for Creators: Allow campaigns to have multiple owners who must all agree to create a spending request.

This project was created to demonstrate the power of blockchain technology in creating transparent and accountable systems for social good.
