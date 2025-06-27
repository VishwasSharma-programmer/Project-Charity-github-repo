// contracts/charityContract.js
'use strict';
const { Contract } = require('fabric-contract-api');

class CharityContract extends Contract {

  async initLedger(ctx) {
    console.info('Ledger initialized');
  }

  async createCampaign(ctx, id, title, goalAmount) {
    const campaign = {
      id,
      title,
      goalAmount,
      donations: [],
      totalDonated: 0
    };
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(campaign)));
    return JSON.stringify(campaign);
  }

  async donate(ctx, id, donor, amount) {
    const campaignAsBytes = await ctx.stub.getState(id);
    if (!campaignAsBytes || campaignAsBytes.length === 0) {
      throw new Error(`Campaign ${id} does not exist`);
    }
    const campaign = JSON.parse(campaignAsBytes.toString());
    campaign.donations.push({ donor, amount });
    campaign.totalDonated += parseFloat(amount);
    await ctx.stub.putState(id, Buffer.from(JSON.stringify(campaign)));
    return JSON.stringify(campaign);
  }

  async getCampaign(ctx, id) {
    const campaignAsBytes = await ctx.stub.getState(id);
    return campaignAsBytes.toString();
  }
}

module.exports = CharityContract;
