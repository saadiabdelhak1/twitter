import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { tweetsAPI } from '../services/api'

const PostTweet = () => {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await tweetsAPI.createTweet({ name, text, image })
      navigate('/')
    } catch (err) {
      console.error('Error submitting tweet:', err)
      setError('Failed to post tweet. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <header>
        <Link to="/">
          <img className="header-back" src="/images/back.svg" alt="Back" />
        </Link>
        <button 
          type="submit" 
          className="header-button" 
          form="tweet-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Tweet'}
        </button>
      </header>

      <div className="tweet-form">
        <img className="tweet-form-image" src="/images/post-default-icon.svg" alt="Profile" />
        
        {error && (
          <div style={{ padding: '10px', background: '#f8d7da', border: '1px solid #f5c6cb', margin: '10px 0', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <form id="tweet-form" onSubmit={handleSubmit}>
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
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={250}
            required
          />
          
          <input
            type="file"
            name="post_image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          
          <div className="tweet-form-buttons">
            <img src="/images/image.svg" alt="Add image" />
          </div>
        </form>
      </div>
    </>
  )
}

export default PostTweet