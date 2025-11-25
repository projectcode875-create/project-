from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from data import ARTICLES

class NewsRecommender:
    def __init__(self):
        self.articles = pd.DataFrame(ARTICLES)
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = self.vectorizer.fit_transform(self.articles['content'])

    def get_recommendations(self, read_article_ids, top_n=3):
        if not read_article_ids:
            return []

        # Filter articles that the user has already read
        read_indices = self.articles[self.articles['id'].isin(read_article_ids)].index
        
        if read_indices.empty:
            return []

        # Calculate mean vector of read articles (user profile)
        user_profile = self.tfidf_matrix[read_indices].mean(axis=0)
        
        # Calculate cosine similarity between user profile and all articles
        # cosine_similarity returns a shape of (1, n_samples)
        cosine_sim = cosine_similarity(user_profile, self.tfidf_matrix).flatten()
        
        # Get indices of top similar articles
        # We want to exclude articles already read
        # So we set their similarity to -1
        cosine_sim[read_indices] = -1
        
        # Get top N indices
        # argsort returns indices that would sort the array, so we take the last N
        top_indices = cosine_sim.argsort()[-top_n:][::-1]
        
        # Filter out indices with negative similarity (meaning they were read or irrelevant)
        # This handles cases where we have fewer unread articles than top_n
        top_indices = [i for i in top_indices if cosine_sim[i] > 0]
        
        recommended_articles = self.articles.iloc[top_indices].to_dict('records')
        return recommended_articles
