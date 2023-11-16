require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const validURL = require('valid-url');
const shortid = require('shortid'); // Import shortid
const URL = require('./models/URLModel');
const cors = require('cors'); // Import cors middleware

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB using your connection string
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// URL Shortening route
app.post('/shorten', async (req, res) => {
  const { longURL } = req.body;
  if (validURL.isWebUri(longURL)) {
    const shortCode = shortid.generate(); // Generate a unique short code
    const shortURL = `${process.env.BASE_URL}/${shortCode}`;
    const urlModel = new URL({ longURL, shortURL, shortCode });
    urlModel.save()
      .then(() => {
        res.json({ shortURL });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error saving URL mapping' });
      });
  } else {
    res.status(400).json({ error: 'Invalid URL' });
  }
});

// URL Redirection route
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  URL.findOne({ shortCode: shortCode })
    .then((result) => {
      if (result) {
        res.redirect(result.longURL);
      } else {
        res.status(404).json({ error: 'URL not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error looking up the URL' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
