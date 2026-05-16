const Game = require('../models/Game');
const SavedGame = require('../models/SavedGame');
const scraperService = require('../services/scraperService');

// Get all games
const getAllGames = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20, sort = '-createdAt' } = req.query;

    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    
    const games = await Game.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Game.countDocuments(query);

    res.json({
      games,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ message: 'Failed to fetch games', error: error.message });
  }
};

// Get game by ID
const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json({ game });
  } catch (error) {
    console.error('Get game error:', error);
    res.status(500).json({ message: 'Failed to fetch game', error: error.message });
  }
};

// Scrape and fetch games from AnkerGames
const scrapeGames = async (req, res) => {
  try {
    res.json({ message: 'Scraping started', status: 'in-progress' });

    // Run scraping in background
    scraperService.scrapeAnkerGames()
      .then(games => console.log(`✓ Scraped ${games.length} games`))
      .catch(err => console.error('Scraping error:', err));
  } catch (error) {
    console.error('Scrape error:', error);
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
};

// Save game to user's collection
const saveGame = async (req, res) => {
  try {
    const { gameId, status, rating, notes } = req.body;

    // Check if game exists
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if already saved
    let savedGame = await SavedGame.findOne({ userId: req.user.id, gameId });
    
    if (savedGame) {
      // Update existing
      savedGame.status = status || savedGame.status;
      savedGame.rating = rating !== undefined ? rating : savedGame.rating;
      savedGame.notes = notes || savedGame.notes;
      savedGame.updatedAt = Date.now();
      await savedGame.save();
    } else {
      // Create new
      savedGame = new SavedGame({
        userId: req.user.id,
        gameId,
        status: status || 'wishlist',
        rating,
        notes
      });
      await savedGame.save();
    }

    res.status(201).json({
      message: 'Game saved successfully',
      savedGame
    });
  } catch (error) {
    console.error('Save game error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Game already saved' });
    }
    res.status(500).json({ message: 'Failed to save game', error: error.message });
  }
};

// Get user's saved games
const getUserSavedGames = async (req, res) => {
  try {
    const savedGames = await SavedGame.find({ userId: req.user.id })
      .populate('gameId')
      .sort({ createdAt: -1 });

    res.json({ savedGames });
  } catch (error) {
    console.error('Get saved games error:', error);
    res.status(500).json({ message: 'Failed to fetch saved games', error: error.message });
  }
};

// Remove saved game
const removeSavedGame = async (req, res) => {
  try {
    const savedGame = await SavedGame.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!savedGame) {
      return res.status(404).json({ message: 'Saved game not found' });
    }

    res.json({ message: 'Game removed from collection' });
  } catch (error) {
    console.error('Remove saved game error:', error);
    res.status(500).json({ message: 'Failed to remove game', error: error.message });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  scrapeGames,
  saveGame,
  getUserSavedGames,
  removeSavedGame
};
