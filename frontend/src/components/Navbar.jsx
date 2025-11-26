import React, { useState, useEffect } from 'react';
import SignupModal from './SignupModal';

const Navbar = ({ onCategorySelect, onSearch, onNavigate }) => {
    const [currentDate, setCurrentDate] = useState('');
    const [language, setLanguage] = useState('English');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(today.toLocaleDateString('en-US', options));
    }, []);

    const menuItems = ['POLITICS', 'ECONOMY', 'LIFESTYLE', 'TRAVEL', 'SPORTS'];

    const toggleLanguage = () => {
        setLanguage(language === 'English' ? 'नेपाली' : 'English');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchText);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Left: Logo and Date */}
                    <div className="navbar-left" onClick={() => onCategorySelect(null)} style={{ cursor: 'pointer' }}>
                        <div className="navbar-logo">
                            <span className="logo-blue">News</span>
                            <span className="logo-red">Flow</span>
                        </div>
                        <div className="navbar-date">{currentDate}</div>
                    </div>

                    {/* Center: Menu Items */}
                    <div className="navbar-center">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => onCategorySelect(item)}
                                className="navbar-menu-item"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Right: Search, Sign Up, Language */}
                    <div className="navbar-right">
                        <button
                            className="navbar-item"
                            onClick={() => onNavigate('/admin')}
                            title="Admin Panel"
                        >
                            🔐 Admin
                        </button>

                        {isSearchOpen ? (
                            <form onSubmit={handleSearchSubmit} className="search-form">
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search news..."
                                    className="search-input"
                                    autoFocus
                                    onBlur={() => {
                                        if (!searchText) setIsSearchOpen(false);
                                    }}
                                />
                            </form>
                        ) : (
                            <button className="navbar-search" onClick={() => setIsSearchOpen(true)} aria-label="Search">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            </button>
                        )}

                        <button className="navbar-signup" onClick={() => setIsSignupOpen(true)}>Sign up</button>

                        <button className="navbar-language" onClick={toggleLanguage}>
                            <span className="nepal-flag">🇳🇵</span>
                            <span className="language-text">{language === 'English' ? 'नेपाली' : 'English'}</span>
                        </button>
                    </div>
                </div>
            </nav>
            {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
        </>
    );
};

export default Navbar;
