from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from data import ARTICLES
from recommender import NewsRecommender

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

recommender = NewsRecommender()

class ReadArticlesRequest(BaseModel):
    read_article_ids: List[int]

@app.get("/articles")
def get_articles():
    return ARTICLES

@app.post("/recommend")
def recommend_articles(request: ReadArticlesRequest):
    recommendations = recommender.get_recommendations(request.read_article_ids)
    return recommendations

@app.get("/")
def read_root():
    return {"message": "News Recommendation API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
