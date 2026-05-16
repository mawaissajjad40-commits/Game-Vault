const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  externalId: {
    type: String,
    unique: true,
    sparse: true
  },
  title: {
    type: String,
    required: [true, 'Game title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  imageUrl: String,
  sourceUrl: String,
  source: {
    type: String,
    enum: ['ankergames', 'other'],
    default: 'ankergames'
  },
  category: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  tags: [String],
  lastScraped: Date,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

gameSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Game', gameSchema);
