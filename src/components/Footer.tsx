import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { categories } from '../data/categories';
import './Footer.css';

const Footer: React.FC = () => {
    const { language, t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="contact" className="footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-grid">
                    {/* About Section */}
                    <div className="footer-section about">
                        <div className="footer-logo">
                            <img src="/assets/logo.png" alt="Gopal Traders Logo" className="logo-icon" />
                            <span className="logo-name">{t('shopName')}</span>
                        </div>
                        <p className="footer-description">{t('footerDescription')}</p>

                        {/* Trust Badges */}
                        <div className="trust-badges">
                            <div className="badge">
                                <span className="badge-icon">🏆</span>
                                <span className="badge-text">{t('yearsOfTrust')}</span>
                            </div>
                            <div className="badge">
                                <span className="badge-icon">✓</span>
                                <span className="badge-text">{t('qualityProducts')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">{t('quickLinks')}</h3>
                        <nav className="footer-nav">
                            <button onClick={() => scrollToSection('hero')}>{t('home')}</button>
                            <button onClick={() => scrollToSection('products')}>{t('products')}</button>
                            <button onClick={() => scrollToSection('brands')}>{t('brands')}</button>
                            <button onClick={() => scrollToSection('contact')}>{t('contact')}</button>
                        </nav>
                    </div>

                    {/* Categories */}
                    <div className="footer-section">
                        <h3 className="footer-title">{t('allCategories')}</h3>
                        <nav className="footer-nav categories">
                            {categories.slice(0, 6).map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => scrollToSection('products')}
                                >
                                    {cat.icon} {language === 'en' ? cat.nameEn : cat.nameHi}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section contact">
                        <h3 className="footer-title">{t('contactUs')}</h3>

                        <div className="contact-items">
                            {/* Address */}
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div className="contact-content">
                                    <span className="contact-label">{t('address')}</span>
                                    <address>
                                        {language === 'en'
                                            ? 'Bangali Colony, Near Mataji Temple, Deoli City, Tonk, Rajasthan - 304804'
                                            : 'बंगली कॉलेज, माताजी टेम्पल के पास, डेवली सिटी, टॉंक, राज्य - 304804'
                                        }
                                    </address>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <div className="contact-content">
                                    <span className="contact-label">{t('phone')}</span>
                                    <a href="tel:+918504914621">+91 85049 14621</a>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="contact-item">
                                <span className="contact-icon">💬</span>
                                <div className="contact-content">
                                    <span className="contact-label">{t('whatsapp')}</span>
                                    <a
                                        href="https://wa.me/918504914621"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        +91 85049 14621
                                    </a>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="contact-item">
                                <span className="contact-icon">🕐</span>
                                <div className="contact-content">
                                    <span className="contact-label">{t('businessHours')}</span>
                                    <div className="hours">
                                        <span>{t('mondayToSaturday')}: 9:00 AM - 8:00 PM</span>
                                        <span>{t('sunday')}: {t('closed')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="footer-cta">
                            <a
                                href="tel:+918504914621"
                                className="cta-btn primary"
                            >
                                📞 {t('callNow')}
                            </a>
                            <a
                                href="https://wa.me/918504914621"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cta-btn whatsapp"
                            >
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="copyright">
                        © {currentYear} {t('shopName')}. {t('allRightsReserved')}.
                    </p>
                    <p className="made-with">
                        Made with ❤️ in India
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
