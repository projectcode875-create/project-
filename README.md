# NewsFlow - News Recommendation System

A personalized news recommendation system built with Python (FastAPI) backend and React frontend. The system uses **TF-IDF (Term Frequency-Inverse Document Frequency)** and **Cosine Similarity** to recommend news articles based on your reading history.

## Features

- 📰 Browse latest news articles across multiple categories
- 🎯 Personalized recommendations based on reading history
- 🎨 Modern, responsive UI with dark mode design
- ⚡ Real-time updates using FastAPI backend
- 🧠 Content-based filtering algorithm

## Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.9+** (for backend)
- **Node.js 20.19+** (for frontend)
- **npm** (comes with Node.js)

## Project Structure

```
collegeproject/
├── backend/               # Python FastAPI backend
│   ├── venv/             # Virtual environment
│   ├── main.py           # FastAPI application
│   ├── recommender.py    # TF-IDF recommendation engine
│   ├── data.py           # Mock news data
│   └── requirements.txt  # Python dependencies
└── frontend/             # React frontend
    ├── src/
    │   ├── App.jsx       # Main application component
    │   ├── components/   # Reusable components
    │   └── index.css     # Global styles
    └── package.json      # Node dependencies
```

## Installation

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Mac/Linux
# or
venv\Scripts\activate     # On Windows

# Install dependencies
pip install -r requirements.txt
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Application

You need to run both the backend and frontend servers.

### Start Backend Server

```bash
# From the backend directory
cd backend

# Activate virtual environment (if not already activated)
source venv/bin/activate

# Run the FastAPI server
python main.py
```

The backend will start at **http://localhost:8000**

### Start Frontend Server

Open a **new terminal** and run:

```bash
# From the frontend directory
cd frontend

# Start the development server
npm run dev
```

The frontend will start at **http://localhost:5173**

## How to Use

1. **Open your browser** and navigate to `http://localhost:5173`

2. **Browse Articles**: You'll see the "Latest News" section with various articles across different categories (Science, Technology, Finance, Sports, Health)

3. **Read Articles**: Click on any article card to mark it as "read"
   - Read articles will have a dimmed appearance and a "Read" badge

4. **Get Recommendations**: After reading one or more articles, the "Recommended for You" section will appear at the top
   - The system analyzes the content of articles you've read
   - Recommends similar articles based on content similarity

5. **Continue Reading**: The more articles you read, the better the recommendations become

## How the Recommendation Algorithm Works

The system uses **Content-Based Filtering** with the following approach:

1. **TF-IDF Vectorization**: 
   - Converts article text into numerical vectors
   - TF (Term Frequency): How often a word appears in an article
   - IDF (Inverse Document Frequency): How unique a word is across all articles

2. **User Profile Creation**:
   - Creates a profile by averaging the TF-IDF vectors of articles you've read

3. **Cosine Similarity**:
   - Calculates the angle between your profile vector and each unread article
   - Higher similarity = more relevant recommendation

4. **Ranking**:
   - Articles are ranked by similarity score
   - Top N most similar articles are recommended

## API Endpoints

- `GET /` - Health check
- `GET /articles` - Fetch all news articles
- `POST /recommend` - Get personalized recommendations
  ```json
  {
    "read_article_ids": [1, 2, 3]
  }
  ```

## Technologies Used

### Backend
- **FastAPI**: Modern Python web framework
- **scikit-learn**: TF-IDF vectorization and cosine similarity
- **pandas**: Data manipulation
- **Uvicorn**: ASGI server

### Frontend
- **React**: UI framework
- **Vite**: Build tool and dev server
- **Vanilla CSS**: Custom styling

## Troubleshooting

### Port Already in Use

If you see `Address already in use` error:

```bash
# Kill process on port 8000 (backend)
lsof -t -i:8000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -t -i:5173 | xargs kill -9
```

### Backend Not Starting

```bash
# Ensure you're in the backend directory
cd backend

# Verify virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Not Loading

```bash
# Ensure you're in the frontend directory
cd frontend

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

- 🔐 User authentication and profiles
- 💾 Database integration for persistent storage
- 📊 Analytics dashboard
- 🔍 Search functionality
- 🏷️ Category filtering
- 📱 Mobile app version

## License

This project is for educational purposes.

## Contact

For questions or suggestions, please open an issue in the repository.
