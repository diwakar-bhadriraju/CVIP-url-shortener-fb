// routes/urlRoutes.js
const express = require('express');
const router = express.Router();

// URL Shortening route
router.post('/shorten', async (req, res) => {
  // Handle URL shortening logic here
});

// URL Redirection route
router.get('/:shortCode', async (req, res) => {
  // Handle URL redirection logic here
});
router.get('/',async(req,res)=>{
  res.send('Hello World!');
})
module.exports = router;
