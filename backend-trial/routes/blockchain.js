const express = require('express');
const router = express.Router();
const { getContract } = require('../blockchain/gateway');

router.post('/campaign', async (req, res) => {
    try {
        const { id, name, goalAmount, organizer } = req.body;
        const { contract, gateway } = await getContract();
        await contract.submitTransaction('createCampaign', id, name, goalAmount.toString(), organizer);
        await gateway.disconnect();
        res.status(200).json({ message: 'Campaign created on blockchain' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/donate', async (req, res) => {
    try {
        const { id, donor, amount } = req.body;
        const { contract, gateway } = await getContract();
        await contract.submitTransaction('donate', id, donor, amount.toString());
        await gateway.disconnect();
        res.status(200).json({ message: 'Donation recorded on blockchain' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
