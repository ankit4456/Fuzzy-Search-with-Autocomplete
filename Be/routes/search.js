const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Fuse = require('fuse.js');

const fuseOptions = {
  keys: [
    { name: 'name', weight: 0.7 },
    { name: 'description', weight: 0.2 },
    { name: 'category', weight: 0.05 },
    { name: 'tags', weight: 0.05 }
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: false,
  findAllMatches: true,
};

function calculateRelevanceScore(item, query, fuseScore) {
  const queryLower = query.toLowerCase().trim();
  const nameLower = item.name.toLowerCase();
  
  let relevanceBonus = 0;
  
  if (nameLower === queryLower) {
    relevanceBonus = 1000;
  } else if (nameLower.startsWith(queryLower)) {
    relevanceBonus = 500;
  } else if (nameLower.includes(queryLower)) {
    relevanceBonus = 200;
  }
  
  const tagsMatch = item.tags.some(tag => 
    tag.toLowerCase().includes(queryLower)
  );
  if (tagsMatch) {
    relevanceBonus += 50;
  }
  
  return {
    item: item,
    score: fuseScore - relevanceBonus,
    originalScore: fuseScore
  };
}

router.get('/', async (req, res) => {
  try {
    const query = req.query.q || '';
    const limit = parseInt(req.query.limit) || 10;

    if (!query.trim()) {
      return res.json({
        success: true,
        results: [],
        count: 0,
        message: 'Please enter a search term'
      });
    }

    const allItems = await Item.find({}).lean();

    if (allItems.length === 0) {
      return res.json({
        success: true,
        results: [],
        count: 0,
        message: 'No items found in database'
      });
    }

    const fuse = new Fuse(allItems, fuseOptions);
    const searchResults = fuse.search(query);

    const resultsWithRelevance = searchResults.map(result => 
      calculateRelevanceScore(result.item, query, result.score)
    );

    resultsWithRelevance.sort((a, b) => a.score - b.score);

    const results = resultsWithRelevance
      .slice(0, limit)
      .map(r => r.item);

    res.json({
      success: true,
      results: results,
      count: results.length,
      query: query,
      message: results.length > 0 
        ? `Found ${results.length} result(s)` 
        : 'No matching results found'
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during search',
      error: error.message
    });
  }
});

router.get('/item/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      item: item
    });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
