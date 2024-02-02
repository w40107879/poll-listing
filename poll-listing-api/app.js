const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const pollsData = require('./db/polls.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Endpoint to get all polls
app.get('/api/polls', (req, res) => {
  res.json(pollsData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
