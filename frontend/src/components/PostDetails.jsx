import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { tweetsAPI } from '../services/api'

const PostDetails = () => {
  const { tweetId } = useParams()
  const [tweet, setTweet] = useState(null)
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTweetDetails()
  }, [tweetId])

  const fetchTweetDetails = async () => {
    try {
      setLoading(true)
      const data = await tweetsAPI.getTweetById(tweetId)
      setTweet(data.tweet)
      setReplies(data.replies || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching tweet details:', err)
      setError('Failed to load tweet details.')
      // Fallback to mock data
      const mockTweet = {
        id: tweetId,
        name: "John Doe",
        text: "This is the main tweet that we're viewing details for.",
        create_at: "2024-01-15T10:30:00Z",
        image_path: null,
        parent_tweet_id: null
      }
      setTweet(mockTweet)
      setReplies([])
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
          <Link to="/">
            <img className="header-back" src="/images/back.svg" alt="Back" />
          </Link>
          <h1>Tweet</h1>
        </header>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
      </>
    )
  }

  return (
    <>
      <header>
        <Link to="/">
          <img className="header-back" src="/images/back.svg" alt="Back" />
        </Link>
        <h1>Tweet</h1>
      </header>

      {error && (
        <div style={{ padding: '10px', background: '#fff3cd', border: '1px solid #ffeaa7', margin: '10px' }}>
          {error}
        </div>
      )}

      {tweet && (
        <div className="tweet">
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
              <img className="tweet-image" src={`/images/${tweet.image_path.split('/').pop()}`} alt="Tweet attachment" />
            )}
            <div className="tweet-buttons">
              <Link to={`/reply/${tweet.id}`}>
                <img className="tweet-reply" src="/images/comment.svg" alt="Reply" />
              </Link>
              <div className="tweet-reply-count">
                {replies.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="replies">
        {replies.map(reply => (
          <div key={reply.id} className="tweet reply">
            <div className="tweet-icon">
              <img src="/images/post-default-icon.svg" alt="Profile" />
            </div>
            <div className="tweet-content">
              <div className="tweet-name-area">
                <span className="tweet-name">{reply.name}</span>
                <span className="tweet-created-at">{formatDate(reply.create_at)}</span>
              </div>
              <p>{reply.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PostDetails