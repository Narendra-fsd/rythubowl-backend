const Analytics = require('../models/analyticsModel');
const { calculateAnalytics } = require('../services/analyticsService');

// Get live analytics (directly from DB without storing)
exports.getLiveAnalytics = async (req, res) => {
  try {
    const analytics = await calculateAnalytics();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: err.message });
  }
};

// Get cached analytics (from Analytics collection)
exports.getCachedAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findOne().sort({ createdAt: -1 });
    if (!analytics) return res.status(404).json({ message: 'No analytics data found' });
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cached analytics', error: err.message });
  }
};

// Update cached analytics (manual trigger by SuperAdmin)
exports.updateCachedAnalytics = async (req, res) => {
  try {
    const newData = await calculateAnalytics();
    const analytics = new Analytics(newData);
    await analytics.save();
    res.json({ message: 'Analytics updated successfully', analytics });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update analytics', error: err.message });
  }
};
