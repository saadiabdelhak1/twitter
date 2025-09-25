import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Tweets API
export const tweetsAPI = {
  // Get all tweets
  getAllTweets: async () => {
    const response = await api.get('/tweets')
    return response.data
  },

  // Get tweet by ID with replies
  getTweetById: async (id) => {
    const response = await api.get(`/tweets/${id}`)
    return response.data
  },

  // Create new tweet
  createTweet: async (tweetData) => {
    const formData = new FormData()
    formData.append('name', tweetData.name)
    formData.append('text', tweetData.text)
    if (tweetData.image) {
      formData.append('post_image', tweetData.image)
    }

    const response = await api.post('/tweets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Create reply to tweet
  createReply: async (tweetId, replyData) => {
    const response = await api.post(`/tweets/${tweetId}/reply`, replyData)
    return response.data
  },
}

export default api