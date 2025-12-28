import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const Hero: React.FC = () => {
    const { t } = useLanguage();

    const scrollToProducts = () => {
        const element = document.getElementById('products');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="hero">
            <div className="hero-background">
                <div className="hero-gradient"></div>
                <div className="hero-pattern"></div>
            </div>

            <div className="hero-container">
                <div className="hero-content">
                    {/* Trust Badge */}
                    <div className="trust-badge">
                        <span className="trust-icon">⭐</span>
                        <span className="trust-text">{t('yearsOfTrust')}</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="hero-title">{t('heroTitle')}</h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle">{t('heroSubtitle')}</p>

                    {/* Description */}
                    <p className="hero-description">{t('heroDescription')}</p>

                    {/* CTA Buttons */}
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={scrollToProducts}>
                            <span className="btn-icon">🛒</span>
                            {t('viewProducts')}
                        </button>
                        <a href="tel:+919876543210" className="btn-secondary">
                            <span className="btn-icon">📞</span>
                            {t('callNow')}
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-icon">🏆</span>
                            <div className="stat-content">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">{t('yearsOfTrust')}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">😊</span>
                            <div className="stat-content">
                                <span className="stat-number">10,000+</span>
                                <span className="stat-label">{t('happyCustomers')}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">📦</span>
                            <div className="stat-content">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">{t('qualityProducts')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="hero-image">
                    <div className="hero-image-container">
                        <img
                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"
                            alt="Kitchen utensils and cookware"
                            loading="eager"
                        />
                        <div className="floating-badge badge-1">
                            <span>🍳</span>
                            <span>Cookware</span>
                        </div>
                        <div className="floating-badge badge-2">
                            <span>🧹</span>
                            <span>Cleaning</span>
                        </div>
                        <div className="floating-badge badge-3">
                            <span>🍽️</span>
                            <span>Crockery</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator" onClick={scrollToProducts}>
                <span className="scroll-text">Scroll</span>
                <span className="scroll-arrow">↓</span>
            </div>
        </section>
    );
};

export default Hero;
