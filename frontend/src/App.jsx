import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles.css'
import Layout from './components/Layout'
import Home from './components/Home'
import PostTweet from './components/PostTweet'
import PostDetails from './components/PostDetails'
import Reply from './components/Reply'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post-tweet" element={<PostTweet />} />
          <Route path="/post-details/:tweetId" element={<PostDetails />} />
          <Route path="/reply/:tweetId" element={<Reply />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
