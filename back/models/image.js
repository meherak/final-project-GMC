const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  secureUrl: {
    type: String,
    required: true,
    trim: true, 
  }
});

module.exports = mongoose.model('Image', imageSchema);