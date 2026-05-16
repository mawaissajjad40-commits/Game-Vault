const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Public routes
router.get('/games', scraperController.getAllGames);
router.get('/games/:id', scraperController.getGameById);

// Protected routes (admin only)
router.post('/scrape', authenticateToken, authorizeAdmin, scraperController.scrapeGames);

// User routes (protected)
router.post('/save', authenticateToken, scraperController.saveGame);
router.get('/saved', authenticateToken, scraperController.getUserSavedGames);
router.delete('/saved/:id', authenticateToken, scraperController.removeSavedGame);

module.exports = router;
