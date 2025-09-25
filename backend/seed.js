const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter-clone';

// Tweet Schema (same as in server.js)
const tweetSchema = new mongoose.Schema({
  parent_tweet_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    default: null
  },
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  text: {
    type: String,
    required: true,
    maxLength: 250
  },
  image_path: {
    type: String,
    default: null
  },
  create_at: {
    type: Date,
    default: Date.now
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

const seedData = [
  {
    name: "John Doe",
    text: "Welcome to our new React Twitter clone! This is built with modern tech stack.",
    create_at: new Date('2024-01-15T10:30:00Z')
  },
  {
    name: "Jane Smith",
    text: "Another tweet with some interesting content. React + Node.js + MongoDB is amazing!",
    create_at: new Date('2024-01-15T11:45:00Z')
  },
  {
    name: "Alice Johnson",
    text: "Just migrated from Django to this modern stack. Love the performance improvements!",
    create_at: new Date('2024-01-15T12:15:00Z')
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Tweet.deleteMany({});
    console.log('Cleared existing tweets');
    
    // Insert seed data
    const tweets = await Tweet.insertMany(seedData);
    console.log(`Inserted ${tweets.length} tweets`);
    
    // Create some sample replies
    const firstTweet = tweets[0];
    const replies = [
      {
        parent_tweet_id: firstTweet._id,
        name: "Bob Wilson",
        text: "Great work on the migration! The new UI looks fantastic.",
        create_at: new Date('2024-01-15T10:45:00Z')
      },
      {
        parent_tweet_id: firstTweet._id,
        name: "Sarah Davis",
        text: "Really impressed with the speed of the new app!",
        create_at: new Date('2024-01-15T11:00:00Z')
      }
    ];
    
    const insertedReplies = await Tweet.insertMany(replies);
    console.log(`Inserted ${insertedReplies.length} replies`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();