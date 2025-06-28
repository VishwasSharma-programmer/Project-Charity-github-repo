const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const campaignRoutes = require('./routes/campaignRoutes');
const blockchainRoutes = require('./routes/blockchain');
app.use('/api/blockchain', blockchainRoutes);


app.use(cors());
app.use(bodyParser.json());
app.use('/api/campaigns', campaignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});