import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { tweetsAPI } from '../services/api'

const Home = () => {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTweets()
  }, [])

  const fetchTweets = async () => {
    try {
      setLoading(true)
      const data = await tweetsAPI.getAllTweets()
      setTweets(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching tweets:', err)
      setError('Failed to load tweets. Using fallback data.')
      // Fallback to mock data if API fails
      setTweets([
        {
          id: '1',
          name: "John Doe",
          text: "This is a sample tweet in our new React Twitter clone!",
          create_at: "2024-01-15T10:30:00Z",
          image_path: null,
          parent_tweet_id: null,
          count: 3
        },
        {
          id: '2',
          name: "Jane Smith", 
          text: "Another tweet with some interesting content. React is amazing!",
          create_at: "2024-01-15T11:45:00Z",
          image_path: null,
          parent_tweet_id: null,
          count: 1
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <>
        <header>
          <h1>home</h1>
          <Link to="/post-tweet">
            <button type="button" className="header-button">Tweet</button>
          </Link>
        </header>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading tweets...</div>
      </>
    )
  }

  return (
    <>
      <header>
        <h1>home</h1>
        <Link to="/post-tweet">
          <button type="button" className="header-button">Tweet</button>
        </Link>
      </header>

      {error && (
        <div style={{ padding: '10px', background: '#fff3cd', border: '1px solid #ffeaa7', margin: '10px' }}>
          {error}
        </div>
      )}

      {tweets.length === 0 ? (
        <h4>No tweets present.</h4>
      ) : (
        tweets.map(tweet => {
          if (tweet.parent_tweet_id) return null; // Only show main tweets, not replies
          
          return (
            <div key={tweet.id} className="tweet">
              <div className="tweet-icon">
                <img src="/images/post-default-icon.svg" alt="Profile" />
              </div>
              <div className="tweet-content">
                <div className="tweet-name-area">
                  <span className="tweet-name">{tweet.name}</span>
                  <span className="tweet-created-at">{formatDate(tweet.create_at)}</span>
                </div>
                <p>{tweet.text}</p>
                {tweet.image_path && (
                  <Link to={`/post-details/${tweet.id}`}>
                    <img className="tweet-image" src={`/images/${tweet.image_path.split('/').pop()}`} alt="Tweet attachment" />
                  </Link>
                )}
                <div className="tweet-buttons">
                  <Link to={`/reply/${tweet.id}`}>
                    <img className="tweet-reply" src="/images/comment.svg" alt="Reply" />
                  </Link>
                  <div className="tweet-reply-count">
                    {tweet.count}
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}

      <div className="post-tweet-button">
        <Link to="/post-tweet">
          <img src="/images/post-tweet.svg" alt="New Tweet" />
        </Link>
      </div>
    </>
  )
}

export default Home