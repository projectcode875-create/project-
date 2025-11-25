import React, { useState, useEffect } from 'react';
import ArticleCard from './components/ArticleCard';

function App() {
  const [articles, setArticles] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [readArticleIds, setReadArticleIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (readArticleIds.length > 0) {
      fetchRecommendations();
    }
  }, [readArticleIds]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:8000/articles');
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read_article_ids: readArticleIds }),
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleArticleClick = (id) => {
    if (!readArticleIds.includes(id)) {
      setReadArticleIds([...readArticleIds, id]);
    }
  };

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  return (
    <div>
      <div className="header">
        <h1>NewsFlow</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Your personalized news feed</p>
      </div>

      {recommendations.length > 0 && (
        <section>
          <h2 className="section-title">Recommended for You</h2>
          <div className="grid">
            {recommendations.map((article) => (
              <ArticleCard
                key={`rec-${article.id}`}
                article={article}
                onClick={handleArticleClick}
                isRead={readArticleIds.includes(article.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="section-title">Latest News</h2>
        <div className="grid">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={handleArticleClick}
              isRead={readArticleIds.includes(article.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
