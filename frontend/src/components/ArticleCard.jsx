import React from "react";

const ArticleCard = ({ article, onClick, isRead, onReadMore }) => {
  const handleCardClick = (e) => {
    // Don't mark as read if clicking the external link or read more button
    if (e.target.tagName !== "A" && !e.target.classList.contains('read-more-btn')) {
      onClick(article.id);
    }
  };

  const handleReadMore = (e) => {
    e.stopPropagation();
    onClick(article.id); // Mark as read
    onReadMore(article); // Open full content
  };

  return (
    <div className={`card ${isRead ? "read" : ""}`} onClick={handleCardClick}>
      {article.image && (
        <img src={article.image} alt={article.title} className="card-image" />
      )}
      <div>
        <div className="card-category">{article.category}</div>
        <h3 className="card-title">
          {article.url ? (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                onClick(article.id);
              }}
            >
              {article.title}
            </a>
          ) : (
            article.title
          )}
        </h3>
        <p className="card-content">
          {article.content.substring(0, 150)}...
        </p>
        <button 
          className="read-more-btn" 
          onClick={handleReadMore}
        >
          Read Full Article
        </button>
      </div>
      {isRead && <span className="read-badge">Read</span>}
    </div>
  );
};

export default ArticleCard;
