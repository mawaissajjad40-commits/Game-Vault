const mongoose = require('mongoose');

const savedGameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  notes: String,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  status: {
    type: String,
    enum: ['wishlist', 'playing', 'completed', 'archived'],
    default: 'wishlist'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can only save a game once
savedGameSchema.index({ userId: 1, gameId: 1 }, { unique: true });

module.exports = mongoose.model('SavedGame', savedGameSchema);
