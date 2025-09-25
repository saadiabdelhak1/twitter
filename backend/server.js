const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection with fallback to in-memory storage
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter-clone';

// Try to connect to MongoDB, fallback to in-memory storage if unavailable
let useInMemory = false;
let tweets = [];
let tweetIdCounter = 1;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB');
    return true;
  } catch (err) {
    console.warn('MongoDB connection failed, using in-memory storage:', err.message);
    useInMemory = true;
    
    // Seed in-memory data
    tweets = [
      {
        id: '1',
        _id: '1',
        parent_tweet_id: null,
        name: "John Doe",
        text: "Welcome to our new React Twitter clone! This is built with modern tech stack.",
        create_at: new Date('2024-01-15T10:30:00Z'),
        image_path: null,
        count: 2
      },
      {
        id: '2',
        _id: '2',
        parent_tweet_id: null,
        name: "Jane Smith",
        text: "Another tweet with some interesting content. React + Node.js is amazing!",
        create_at: new Date('2024-01-15T11:45:00Z'),
        image_path: null,
        count: 0
      },
      {
        id: '3',
        _id: '3',
        parent_tweet_id: '1',
        name: "Bob Wilson",
        text: "Great work on the migration! The new UI looks fantastic.",
        create_at: new Date('2024-01-15T10:45:00Z'),
        image_path: null,
        count: 0
      },
      {
        id: '4',
        _id: '4',
        parent_tweet_id: '1',
        name: "Sarah Davis",
        text: "Really impressed with the speed of the new app!",
        create_at: new Date('2024-01-15T11:00:00Z'),
        image_path: null,
        count: 0
      }
    ];
    return false;
  }
};

connectToMongoDB();

// Tweet Schema (matching the Django model structure)
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

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes

// Get all tweets with reply counts
app.get('/api/tweets', async (req, res) => {
  try {
    if (useInMemory) {
      const mainTweets = tweets.filter(t => !t.parent_tweet_id).map(tweet => ({
        ...tweet,
        count: tweets.filter(t => t.parent_tweet_id === tweet.id).length
      }));
      return res.json(mainTweets.sort((a, b) => new Date(b.create_at) - new Date(a.create_at)));
    }
    
    const tweetsData = await Tweet.find().sort({ create_at: -1 });
    
    // Add reply count to each tweet
    const tweetsWithCounts = await Promise.all(
      tweetsData.map(async (tweet) => {
        const replyCount = await Tweet.countDocuments({ parent_tweet_id: tweet._id });
        return {
          ...tweet.toObject(),
          id: tweet._id,
          count: replyCount
        };
      })
    );
    
    res.json(tweetsWithCounts);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

// Get a specific tweet with replies
app.get('/api/tweets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (useInMemory) {
      const tweet = tweets.find(t => t.id === id);
      if (!tweet) {
        return res.status(404).json({ error: 'Tweet not found' });
      }
      const replies = tweets.filter(t => t.parent_tweet_id === id);
      return res.json({ tweet, replies });
    }
    
    const tweet = await Tweet.findById(id);
    
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    
    const replies = await Tweet.find({ parent_tweet_id: id }).sort({ create_at: 1 });
    
    res.json({
      tweet: { ...tweet.toObject(), id: tweet._id },
      replies: replies.map(reply => ({ ...reply.toObject(), id: reply._id }))
    });
  } catch (error) {
    console.error('Error fetching tweet details:', error);
    res.status(500).json({ error: 'Failed to fetch tweet details' });
  }
});

// Create a new tweet
app.post('/api/tweets', upload.single('post_image'), async (req, res) => {
  try {
    const { name, text } = req.body;
    
    if (!name || !text) {
      return res.status(400).json({ error: 'Name and text are required' });
    }
    
    const tweetData = {
      name: name.trim(),
      text: text.trim(),
      image_path: req.file ? req.file.filename : null,
      create_at: new Date()
    };
    
    if (useInMemory) {
      const newTweet = {
        ...tweetData,
        id: String(tweetIdCounter++),
        _id: String(tweetIdCounter),
        parent_tweet_id: null,
        count: 0
      };
      tweets.unshift(newTweet);
      return res.status(201).json(newTweet);
    }
    
    const newTweet = new Tweet(tweetData);
    await newTweet.save();
    
    res.status(201).json({ ...newTweet.toObject(), id: newTweet._id });
  } catch (error) {
    console.error('Error creating tweet:', error);
    res.status(500).json({ error: 'Failed to create tweet' });
  }
});

// Create a reply to a tweet
app.post('/api/tweets/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, text } = req.body;
    
    if (!name || !text) {
      return res.status(400).json({ error: 'Name and text are required' });
    }
    
    if (useInMemory) {
      const parentTweet = tweets.find(t => t.id === id);
      if (!parentTweet) {
        return res.status(404).json({ error: 'Parent tweet not found' });
      }
      
      const newReply = {
        id: String(tweetIdCounter++),
        _id: String(tweetIdCounter),
        parent_tweet_id: id,
        name: name.trim(),
        text: text.trim(),
        create_at: new Date(),
        image_path: null,
        count: 0
      };
      
      tweets.push(newReply);
      
      // Update parent tweet reply count
      const parentIndex = tweets.findIndex(t => t.id === id);
      if (parentIndex !== -1) {
        tweets[parentIndex].count = (tweets[parentIndex].count || 0) + 1;
      }
      
      return res.status(201).json(newReply);
    }
    
    // Check if parent tweet exists
    const parentTweet = await Tweet.findById(id);
    if (!parentTweet) {
      return res.status(404).json({ error: 'Parent tweet not found' });
    }
    
    const replyData = {
      parent_tweet_id: id,
      name: name.trim(),
      text: text.trim()
    };
    
    const newReply = new Tweet(replyData);
    await newReply.save();
    
    res.status(201).json({ ...newReply.toObject(), id: newReply._id });
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({ error: 'Failed to create reply' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MongoDB URI: ${MONGODB_URI}`);
});

module.exports = app;