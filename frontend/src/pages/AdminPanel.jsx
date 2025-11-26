import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [customArticles, setCustomArticles] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Technology',
        content: '',
        image: '',
        url: ''
    });

    const categories = ['Technology', 'Science', 'Business', 'Sports', 'Health', 'Finance', 'News', 'Lifestyle'];

    useEffect(() => {
        if (isAuthenticated) {
            fetchCustomArticles();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/admin/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setIsAuthenticated(true);
                setPassword('');
            } else {
                alert('Invalid password! Default password is: admin123');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Authentication failed');
        }
    };

    const fetchCustomArticles = async () => {
        try {
            const response = await fetch('http://localhost:8000/admin/articles');
            const data = await response.json();
            setCustomArticles(data);
        } catch (error) {
            console.error('Error fetching custom articles:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/admin/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Article created successfully!');
                setFormData({
                    title: '',
                    category: 'Technology',
                    content: '',
                    image: '',
                    url: ''
                });
                setShowForm(false);
                fetchCustomArticles();
            } else {
                alert('Failed to create article');
            }
        } catch (error) {
            console.error('Error creating article:', error);
            alert('Error creating article');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this article?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/admin/articles/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Article deleted successfully!');
                fetchCustomArticles();
            } else {
                alert('Failed to delete article');
            }
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Error deleting article');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-card">
                    <h1>🔐 Admin Login</h1>
                    <p>Enter admin password to access the panel</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="admin-input"
                            required
                        />
                        <button type="submit" className="admin-btn">
                            Login
                        </button>
                    </form>
                    <p className="hint">Default password: admin123</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>📰 NewsFlow Admin Panel</h1>
                <button onClick={() => window.location.href = '/'} className="home-btn">
                    ← Back to Home
                </button>
            </div>

            <div className="admin-actions">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="admin-btn"
                >
                    {showForm ? '✕ Cancel' : '+ Add New Article'}
                </button>
            </div>

            {showForm && (
                <div className="admin-form-container">
                    <h2>Create Custom Article</h2>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter article title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Content *</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Enter article content"
                                rows="8"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Image URL (optional)</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="form-group">
                            <label>Source URL (optional)</label>
                            <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://source.com/article"
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            ✓ Create Article
                        </button>
                    </form>
                </div>
            )}

            <div className="custom-articles-list">
                <h2>Custom Articles ({customArticles.length})</h2>
                {customArticles.length === 0 ? (
                    <p className="no-articles">No custom articles yet. Create one above!</p>
                ) : (
                    <div className="articles-grid">
                        {customArticles.map(article => (
                            <div key={article.id} className="admin-article-card">
                                {article.image && (
                                    <img src={article.image} alt={article.title} className="admin-article-image" />
                                )}
                                <div className="admin-article-content">
                                    <span className="admin-badge">{article.category}</span>
                                    <h3>{article.title}</h3>
                                    <p>{article.content.substring(0, 100)}...</p>
                                    <div className="admin-article-actions">
                                        <span className="article-id">ID: {article.id}</span>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="delete-btn"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
