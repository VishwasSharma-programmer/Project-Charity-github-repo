// scripts/deploy-charity.js

const hre = require("hardhat");

async function main() {
  // 1. Get the contract to deploy.
  const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");

  console.log("Deploying CampaignFactory contract to the Sepolia network...");

  // 2. Deploy it.
  const campaignFactory = await CampaignFactory.deploy();

  // 3. Wait for the deployment to be confirmed on the blockchain.
  await campaignFactory.deployed();

  // 4. Print the address of the deployed contract.
  console.log(`✅ CampaignFactory has been successfully deployed to: ${campaignFactory.address}`);
}

// Standard pattern to handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});