// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const CharityCrowdfunding = await hre.ethers.getContractFactory("CharityCrowdfunding");

  // Deploy the contract
  const charityCrowdfunding = await CharityCrowdfunding.deploy();

  // Wait for deployment to finish
  await charityCrowdfunding.deployed();

  console.log("✅ CharityCrowdfunding deployed to:", charityCrowdfunding.address);
}

// Run the script with error handling
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
