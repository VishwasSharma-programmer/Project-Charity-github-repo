const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, 'connection-profile.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function getContract() {
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: false }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('charity-contract'); // Adjust name
    return { contract, gateway };
}

module.exports = { getContract };
