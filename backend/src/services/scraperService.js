const axios = require('axios');
const Game = require('../models/Game');

// RAWG free API - no key needed for basic usage
// Get free key at https://rawg.io/apidocs for higher limits
const RAWG_URL = 'https://api.rawg.io/api/games';
const API_KEY = process.env.RAWG_API_KEY || '';

const axiosInstance = axios.create({ timeout: 15000 });

const scrapeAnkerGames = async () => {
  try {
    console.log('🔄 Fetching games from RAWG API...');

    const params = {
      page_size: 40,
      ordering: '-rating',
      ...(API_KEY && { key: API_KEY })
    };

    const response = await axiosInstance.get(RAWG_URL, { params });
    const results = response.data.results;

    if (!results || results.length === 0) {
      console.warn('⚠️ No games returned from API');
      return [];
    }

    console.log(`📦 Got ${results.length} games, saving to DB...`);

    const games = results.map((g) => ({
      externalId: String(g.id),
      title: g.name,
      description: g.genres?.map(x => x.name).join(', ') || '',
      imageUrl: g.background_image || '',
      sourceUrl: `https://rawg.io/games/${g.slug}`,
      source: 'rawg',
      category: g.genres?.[0]?.name || 'General',
      rating: g.rating || 0,
      downloads: g.ratings_count || 0,
      price: 0,
      currency: 'USD',
      tags: g.tags?.slice(0, 5).map(t => t.name) || [],
      lastScraped: new Date()
    }));

    return await processGames(games);
  } catch (error) {
    console.error('❌ Scrape error:', error.message);
    return [];
  }
};

const processGames = async (gamesData) => {
  const processed = [];
  for (const gameObj of gamesData) {
    try {
      const saved = await Game.findOneAndUpdate(
        { externalId: gameObj.externalId },
        gameObj,
        { upsert: true, new: true, runValidators: false }
      );
      processed.push(saved);
    } catch (err) {
      console.error(`Error saving "${gameObj.title}":`, err.message);
    }
  }
  console.log(`✓ Saved ${processed.length} games to MongoDB`);
  return processed;
};

const getGameDetails = async (gameId) => {
  try {
    const params = API_KEY ? { key: API_KEY } : {};
    const res = await axiosInstance.get(`${RAWG_URL}/${gameId}`, { params });
    return res.data;
  } catch (err) {
    console.error(`Error fetching game ${gameId}:`, err.message);
    return null;
  }
};

const searchGames = async (query) => {
  try {
    return await Game.find({ $text: { $search: query } }).limit(20);
  } catch (err) {
    return [];
  }
};

module.exports = { scrapeAnkerGames, processGames, getGameDetails, searchGames };