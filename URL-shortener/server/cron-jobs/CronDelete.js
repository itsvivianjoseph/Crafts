const cron = require('node-cron');
const Url = require('./models/Url');

// Schedule a task to run every hour
cron.schedule('0 * * * *', async () => {
  try {
    // Find and delete records that have expired
    await Url.deleteMany({ expires_at: { $lt: new Date() } });
    console.log('Expired records deleted successfully.');
  } catch (error) {
    console.error('Error deleting expired records:', error);
  }
});

// Start the cron job
cron.start();