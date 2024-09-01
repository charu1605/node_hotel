const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/mydatabase'; // Replace 'mydatabase' with your database name

// Setup MongoDB connection
mongoose.connect(mongoURL, {
  // The options are commented out since they are deprecated in Mongoose 6+
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Define event listeners for the database connection
db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB server');
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB server due to process termination');
  process.exit(0);
});

module.exports = db;
