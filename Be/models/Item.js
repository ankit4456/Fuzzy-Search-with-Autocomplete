const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

itemSchema.index({ 
  name: 'text', 
  description: 'text', 
  category: 'text',
  tags: 'text'
});

itemSchema.index({ name: 1, category: 1 });

module.exports = mongoose.model('Item', itemSchema);
