const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longURL: String,
  shortURL: String,
  shortCode: String, // Make sure the field matches your model
});

module.exports = mongoose.model('URL', urlSchema);

//const URL = mongoose.model('URL', urlSchema, 'urls');
