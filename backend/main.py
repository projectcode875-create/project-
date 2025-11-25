from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from data import ARTICLES
from recommender import NewsRecommender
from scraper import fetch_articles
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cache for articles
_cached_articles = None
_use_fallback = False

def get_articles_data():
    """Get articles from scraper or fallback to mock data."""
    global _cached_articles, _use_fallback
    
    if _cached_articles is not None:
        return _cached_articles
    
    # Try to scrape articles
    if not _use_fallback:
        logger.info("Attempting to scrape articles from OnlineKhabar...")
        scraped = fetch_articles(max_articles=15)
        
        if scraped and len(scraped) > 0:
            logger.info(f"Successfully scraped {len(scraped)} articles")
            _cached_articles = scraped
            return _cached_articles
        else:
            logger.warning("Scraping failed or returned no articles, using fallback data")
            _use_fallback = True
    
    # Use fallback data
    logger.info("Using fallback mock data")
    _cached_articles = ARTICLES
    return _cached_articles

recommender = None

def get_recommender():
    """Get or create recommender instance."""
    global recommender
    if recommender is None:
        articles_data = get_articles_data()
        recommender = NewsRecommender(articles_data)
    return recommender

class ReadArticlesRequest(BaseModel):
    read_article_ids: List[int]

@app.get("/articles")
def get_articles():
    return get_articles_data()

@app.get("/refresh-articles")
def refresh_articles():
    """Force refresh articles from OnlineKhabar."""
    global _cached_articles, _use_fallback, recommender
    _cached_articles = None
    _use_fallback = False
    recommender = None
    
    articles = get_articles_data()
    return {"message": f"Refreshed {len(articles)} articles", "count": len(articles)}

@app.post("/recommend")
def recommend_articles(request: ReadArticlesRequest):
    rec = get_recommender()
    recommendations = rec.get_recommendations(request.read_article_ids)
    return recommendations

@app.get("/")
def read_root():
    return {"message": "News Recommendation API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
