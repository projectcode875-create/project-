import React from 'react';

const ArticleCard = ({ article, onClick, isRead }) => {
  return (
    <div className={`card ${isRead ? 'read' : ''}`} onClick={() => onClick(article.id)}>
      <div>
        <div className="card-category">{article.category}</div>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-content">{article.content}</p>
      </div>
      {isRead && <span className="read-badge">Read</span>}
    </div>
  );
};

export default ArticleCard;
