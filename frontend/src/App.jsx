import React, { useState, useEffect } from 'react';
import ArticleCard from './components/ArticleCard';
import Navbar from './components/Navbar';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [articles, setArticles] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [readArticleIds, setReadArticleIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('/');

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

  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when changing category
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null); // Clear category when searching
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPage(path);
    if (path === '/admin') {
      window.location.reload(); // Reload for admin panel to ensure clean state
    }
  };

  // Filter articles based on category and search
  const filteredArticles = articles.filter(article => {
    if (selectedCategory && article.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  // Handle admin route
  if (currentPage === '/admin' || window.location.pathname === '/admin') {
    return <AdminPanel />;
  }

  return (
    <div>
      <Navbar
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
      />
      <div className="header">
        <h1>NewsFlow</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Your personalized news feed</p>
      </div>

      {!selectedCategory && !searchQuery && recommendations.length > 0 && (
        <section>
          <h2 className="section-title">Recommended for You</h2>
          <div className="grid">
            {recommendations.map((article) => (
              <ArticleCard
                key={`rec-${article.id}`}
                article={article}
                onClick={handleArticleClick}
                onReadMore={handleReadMore}
                isRead={readArticleIds.includes(article.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="section-title">
          {selectedCategory ? `${selectedCategory} News` :
            searchQuery ? `Search Results for "${searchQuery}"` :
              'Latest News'}
        </h2>
        {filteredArticles.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            No articles found. Try a different category or search term.
          </p>
        ) : (
          <div className="grid">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={handleArticleClick}
                onReadMore={handleReadMore}
                isRead={readArticleIds.includes(article.id)}
              />
            ))}
          </div>
        )}
      </section>

      {selectedArticle && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedArticle.image && (
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="modal-image"
              />
            )}
            <div className="modal-category">{selectedArticle.category}</div>
            <h2 className="modal-title">{selectedArticle.title}</h2>
            <div className="modal-content">
              {selectedArticle.content}
            </div>
            {selectedArticle.url && (
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-source-link"
              >
                Read original article on OnlineKhabar →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
