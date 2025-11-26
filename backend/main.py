from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from data import ARTICLES
from recommender import NewsRecommender
from scraper import fetch_articles
import logging
from datetime import datetime

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

# Storage for custom articles
_custom_articles = []
_next_custom_id = 10000  # Start custom IDs from 10000 to avoid conflicts

def get_articles_data():
    """Get articles from scraper or fallback to mock data, combined with custom articles."""
    global _cached_articles, _use_fallback
    
    # Get base articles (scraped or fallback)
    base_articles = []
    if _cached_articles is not None:
        base_articles = _cached_articles
    else:
        # Try to scrape articles
        if not _use_fallback:
            logger.info("Attempting to scrape articles from OnlineKhabar...")
            scraped = fetch_articles(max_articles=15)
            
            if scraped and len(scraped) > 0:
                logger.info(f"Successfully scraped {len(scraped)} articles")
                _cached_articles = scraped
                base_articles = scraped
            else:
                logger.warning("Scraping failed or returned no articles, using fallback data")
                _use_fallback = True
        
        if _use_fallback or not base_articles:
            # Use fallback data
            logger.info("Using fallback mock data")
            _cached_articles = ARTICLES
            base_articles = ARTICLES
    
    # Combine custom articles with base articles (custom articles first)
    combined_articles = _custom_articles + base_articles
    return combined_articles

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

class CustomArticle(BaseModel):
    title: str
    category: str
    content: str
    image: Optional[str] = None
    url: Optional[str] = None

class AdminPassword(BaseModel):
    password: str

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

# Admin endpoints
@app.post("/admin/verify")
def verify_admin_password(password_data: AdminPassword):
    """Simple password verification for admin access."""
    # Simple password check (in production, use proper authentication)
    ADMIN_PASSWORD = "admin123"  # Change this to your desired password
    if password_data.password == ADMIN_PASSWORD:
        return {"authenticated": True}
    else:
        raise HTTPException(status_code=401, detail="Invalid password")

@app.post("/admin/articles")
def create_custom_article(article: CustomArticle):
    """Create a new custom article."""
    global _next_custom_id, recommender
    
    new_article = {
        "id": _next_custom_id,
        "title": article.title,
        "category": article.category,
        "content": article.content,
        "image": article.image or "",
        "url": article.url or "",
        "published_date": datetime.now().isoformat(),
        "custom": True  # Mark as custom article
    }
    
    _custom_articles.insert(0, new_article)  # Add to beginning
    _next_custom_id += 1
    
    # Reset recommender to include new article
    recommender = None
    
    logger.info(f"Created custom article: {article.title}")
    return new_article

@app.get("/admin/articles")
def get_custom_articles():
    """Get all custom articles."""
    return _custom_articles

@app.delete("/admin/articles/{article_id}")
def delete_custom_article(article_id: int):
    """Delete a custom article."""
    global recommender
    
    for i, article in enumerate(_custom_articles):
        if article["id"] == article_id:
            deleted = _custom_articles.pop(i)
            # Reset recommender to update article list
            recommender = None
            logger.info(f"Deleted custom article: {deleted['title']}")
            return {"message": "Article deleted successfully", "article": deleted}
    
    raise HTTPException(status_code=404, detail="Article not found")

@app.get("/")
def read_root():
    return {"message": "News Recommendation API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
