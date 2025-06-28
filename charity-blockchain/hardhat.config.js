require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // This line loads your .env file

/** @type import('hardhat/config').HardhatUserConfig */

// Get the environment variables from your .env file
const { SEPOLIA_RPC_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    // This is the section that defines the "sepolia" network
    sepolia: {
      // The URL for connecting to the Sepolia network (from Alchemy/Infura)
      url: SEPOLIA_RPC_URL || "", // Fallback to empty string if not found
      // The account that will pay for the deployment (your new MetaMask account)
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [], // Use the private key if it exists
    },
  },
};