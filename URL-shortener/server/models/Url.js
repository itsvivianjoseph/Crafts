const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  original_url: { 
    type: String,
    required: true
    },
  short_url_key: { 
    type: String,
    unique: true,
    required: true 
    },
  expires_at: { 
    type: Number,
    default : 24 
    },
  clicks: { 
    type: Number, 
    default: 0 
}
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;