# Twitter Clone

A modern, responsive Twitter clone built with Django and styled with custom CSS. Features a clean, professional interface that closely mimics Twitter's design and functionality.

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with Twitter's signature blue color scheme
- **Tweet Functionality**: Create, view, and reply to tweets with image support
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional Layout**: Side navigation, tweet timeline, and compose form
- **Interactive Elements**: Hover effects, smooth transitions, and modern avatars
- **Image Upload**: Support for posting tweets with images
- **Reply System**: Threaded conversations and reply functionality

## 🎨 UI Improvements

### Before and After Comparison

**Original Design:**
![Before](https://github.com/user-attachments/assets/0576e6a2-c97e-467a-988a-cd1b064bab8b)

**Modern Design:**
![After - Home](https://github.com/user-attachments/assets/5b8af9e6-d1dc-418f-b108-33eade2b5287)
![After - Compose](https://github.com/user-attachments/assets/30e23b7b-9a4f-4fcd-acda-0185ab25044c)

### Key Improvements:
- ✅ Professional sidebar navigation with Twitter branding
- ✅ Modern color scheme and typography
- ✅ Responsive layout that adapts to different screen sizes
- ✅ Beautiful gradient avatars for user profiles
- ✅ Interactive tweet cards with hover effects
- ✅ Clean compose tweet interface with file upload
- ✅ Mobile-friendly bottom navigation
- ✅ Proper spacing and visual hierarchy

## 🚀 Live Demo

**🌐 [View Live Application](https://your-deployed-app-url.com)** *(Coming soon after deployment)*

## 🛠️ Technologies Used

- **Backend**: Django 3.1.3
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with modern design principles
- **Database**: SQLite (development), PostgreSQL (production)
- **Deployment**: Vercel/Netlify/Heroku ready

## 📦 Installation & Setup

### Prerequisites
- Python 3.9+
- pip
- Git

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saadiabdelhak1/twitter.git
   cd twitter
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Collect static files:**
   ```bash
   python manage.py collectstatic
   ```

6. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

7. **Access the application:**
   Open your browser and go to `http://localhost:8000`

## 🌐 Deployment

This application is configured for deployment on multiple platforms:

### 🚀 Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard:**
   - `SECRET_KEY`: Your Django secret key
   - `DEBUG`: Set to `False`
   - `ALLOWED_HOST`: Your Vercel domain

### 🌍 Netlify Deployment

1. **Build for production:**
   ```bash
   python manage.py collectstatic --noinput
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `python manage.py collectstatic --noinput`
   - Set publish directory: `staticfiles`

### 🟣 Heroku Deployment

1. **Install Heroku CLI and login:**
   ```bash
   heroku login
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DEBUG=False
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Environment Variables

For production deployment, set these environment variables:

```env
SECRET_KEY=your-django-secret-key-here
DEBUG=False
ALLOWED_HOST=your-domain.com
DATABASE_URL=your-database-url (if using PostgreSQL)
```

## 📁 Project Structure

```
twitter/
├── manage.py
├── requirements.txt
├── requirements-prod.txt
├── runtime.txt
├── Procfile
├── vercel.json
├── netlify.toml
├── .env.example
├── twitter/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── tweets/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── migrations/
├── templates/
│   ├── base.html
│   ├── home.html
│   ├── post-tweet.html
│   ├── post-details.html
│   └── reply.html
├── static/
│   ├── tweets/
│   │   ├── modern-styles.css
│   │   └── twitter.js
│   └── images/
└── staticfiles/ (generated)
```

## 🎯 Key Features Implementation

### Tweet Model
```python
class tw_tweet(models.Model):
    parent_tweet_id = models.IntegerField(default=None, null=True)
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=250)
    image_path = models.CharField(max_length=250, null=True)
    create_at = models.DateTimeField('created at')
```

### Modern CSS Architecture
- **Custom CSS Variables**: Consistent color scheme and spacing
- **Responsive Design**: Mobile-first approach with breakpoints
- **Component-based Styling**: Modular CSS for tweets, forms, and navigation
- **Interactive Elements**: Smooth hover effects and transitions

## 🐛 Known Issues & Solutions

### Static Files Not Loading
If static files aren't loading in production:
```bash
python manage.py collectstatic --noinput
```

### ALLOWED_HOSTS Error
Add your domain to the `ALLOWED_HOSTS` list in settings.py or set the `ALLOWED_HOST` environment variable.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

- **Developer**: [saadiabdelhak1](https://github.com/saadiabdelhak1)
- **Contact**: [GitHub Profile](https://github.com/saadiabdelhak1)

## 🙏 Acknowledgments

- Inspired by Twitter's clean and intuitive design
- Built with Django's robust web framework
- Modern CSS techniques for responsive design

---

**⭐ If you found this project helpful, please give it a star on GitHub!**