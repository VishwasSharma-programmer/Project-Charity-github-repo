require("@nomiclabs/hardhat-ethers");
require("dotenv").config({ path: './.env' });
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.25",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};