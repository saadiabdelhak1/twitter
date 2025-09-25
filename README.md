# Twitter Clone - Modern React + Node.js Implementation

This is a modernized version of the Twitter clone application, transformed from Django to a React frontend with Node.js backend and MongoDB database, while maintaining the same Twitter-like design pattern.

## 🚀 Features

- **Twitter-like UI**: Maintains the original design pattern and user experience
- **Modern Tech Stack**: React + Vite frontend, Node.js + Express backend, MongoDB database
- **Real-time Features**: Post tweets, reply to tweets, view tweet details
- **Image Upload**: Support for tweet image attachments
- **Responsive Design**: Mobile-friendly interface
- **API-driven**: RESTful API architecture for scalability

## 🏗️ Architecture

### Frontend (`/frontend`)
- **React 19** with **Vite** for fast development and building
- **React Router** for client-side navigation
- **Axios** for API communication
- **CSS** with the original Twitter-like styling

### Backend (`/backend`)
- **Node.js** with **Express.js** web framework
- **MongoDB** with **Mongoose** ODM
- **Multer** for file upload handling
- **CORS** and security middleware

### Database
- **MongoDB** with collections for tweets and replies
- **Mongoose schemas** matching the original Django models

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd twitter
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your MongoDB URI
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Seed Database (Optional)**
   ```bash
   cd backend
   node seed.js
   ```

### Environment Variables

Create a `.env` file in the backend directory:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/twitter-clone
NODE_ENV=development
```

## 📱 API Endpoints

- `GET /api/tweets` - Get all tweets with reply counts
- `GET /api/tweets/:id` - Get specific tweet with replies
- `POST /api/tweets` - Create new tweet (with optional image)
- `POST /api/tweets/:id/reply` - Reply to a tweet
- `GET /api/health` - Health check

## 🚀 Deployment

### Frontend (GitHub Pages)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to GitHub Pages using GitHub Actions or manual deployment

### Backend (Railway/Heroku/Vercel)
1. Set environment variables on your hosting platform
2. Deploy the `/backend` directory
3. Ensure MongoDB connection is configured

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update `MONGODB_URI` in your environment variables
3. Whitelist your deployment IP addresses

## 🔄 Migration from Django

This application maintains the same functionality as the original Django version:

- **Tweet Model** → MongoDB Tweet collection
- **Django Views** → Express.js API endpoints  
- **Django Templates** → React components
- **Static Files** → Vite-optimized assets
- **SQLite Database** → MongoDB with same data structure

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev     # Start development server
npm start       # Start production server
```

## 📝 Original Django Structure (Preserved for Reference)

The original Django application structure is preserved in the repository:
- `/tweets/` - Django app
- `/templates/` - Django templates
- `/static/` - Static assets
- `manage.py` - Django management script

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the application
5. Submit a pull request

## 📄 License

This project maintains the same license as the original Django application.

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS is configured for your frontend URL
2. **MongoDB Connection**: Verify your MongoDB URI and connection
3. **File Uploads**: Check that the `uploads/` directory exists and has proper permissions
4. **API Errors**: Check browser console and backend logs for detailed error messages

### Support

If you encounter issues, please check the console logs in both frontend and backend for detailed error messages.