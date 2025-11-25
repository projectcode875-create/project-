import React from "react";

const ArticleCard = ({ article, onClick, isRead }) => {
  const handleCardClick = (e) => {
    // Don't mark as read if clicking the external link
    if (e.target.tagName !== "A") {
      onClick(article.id);
    }
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
        <p className="card-content">{article.content}</p>
      </div>
      {isRead && <span className="read-badge">Read</span>}
    </div>
  );
};

export default ArticleCard;
