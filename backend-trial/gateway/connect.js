// gateway/connect.js
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function connect() {
  const ccpPath = path.resolve(__dirname, '..', 'connection-profile.json'); // IBM connection profile
  const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

  const wallet = await Wallets.newFileSystemWallet(path.join(__dirname, '..', 'wallet'));

  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: false }
  });

  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('charity-contract');
  return contract;
}

module.exports = connect;
