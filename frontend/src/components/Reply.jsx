import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { tweetsAPI } from '../services/api'

const Reply = () => {
  const { tweetId } = useParams()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await tweetsAPI.createReply(tweetId, { name, text })
      navigate(`/post-details/${tweetId}`)
    } catch (err) {
      console.error('Error submitting reply:', err)
      setError('Failed to post reply. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header>
        <Link to={`/post-details/${tweetId}`}>
          <img className="header-back" src="/images/back.svg" alt="Back" />
        </Link>
        <button 
          type="submit" 
          className="header-button" 
          form="reply-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Replying...' : 'Reply'}
        </button>
      </header>

      <div className="tweet-form">
        <img className="tweet-form-image" src="/images/post-default-icon.svg" alt="Profile" />
        
        {error && (
          <div style={{ padding: '10px', background: '#f8d7da', border: '1px solid #f5c6cb', margin: '10px 0', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <form id="reply-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <textarea
            name="text"
            placeholder="Tweet your reply"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={250}
            required
          />
        </form>
      </div>
    </>
  )
}

export default Reply