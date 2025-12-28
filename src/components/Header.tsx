import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const Header: React.FC = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo" onClick={() => scrollToSection('hero')}>
                    <img src="/assets/logo.png" alt="Gopal Traders Logo" className="logo-icon" />
                    <div className="logo-text">
                        <span className="logo-name">{t('shopName')}</span>
                        <span className="logo-tagline">{t('tagline')}</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    <button onClick={() => scrollToSection('hero')} className="nav-link">
                        {t('home')}
                    </button>
                    <button onClick={() => scrollToSection('products')} className="nav-link">
                        {t('products')}
                    </button>
                    <button onClick={() => scrollToSection('brands')} className="nav-link">
                        {t('brands')}
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="nav-link">
                        {t('contact')}
                    </button>
                </nav>

                {/* Language Toggle & Menu */}
                <div className="header-actions">
                    <button
                        className="language-toggle"
                        onClick={toggleLanguage}
                        aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
                    >
                        <span className="lang-icon">🌐</span>
                        <span className="lang-text">
                            {language === 'en' ? 'हिंदी' : 'English'}
                        </span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
                    <button onClick={() => scrollToSection('hero')} className="nav-link">
                        {t('home')}
                    </button>
                    <button onClick={() => scrollToSection('products')} className="nav-link">
                        {t('products')}
                    </button>
                    <button onClick={() => scrollToSection('brands')} className="nav-link">
                        {t('brands')}
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="nav-link">
                        {t('contact')}
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
