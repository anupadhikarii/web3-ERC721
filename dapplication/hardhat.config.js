require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
const dotenv = require("dotenv");
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.9",
  networks: {
   rinkeby: {
     url: process.env.REACT_APP_RINKEBE_RPC_URL, //Infura url with projectId
     accounts: [process.env.RINKEBY_PRIVATE_KEY ] // add the account that will deploy the contract (private key)
    },
  },
  etherscan:{
    apiKey: process.env.ETHERSCAN_API
  }
};