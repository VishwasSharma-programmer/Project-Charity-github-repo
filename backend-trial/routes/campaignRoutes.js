// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/campaignController');

router.post('/create', controller.createCampaign);
router.post('/donate', controller.donate);
router.get('/:id', controller.getCampaign);

module.exports = router;
