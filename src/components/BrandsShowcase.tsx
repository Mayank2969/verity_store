import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { brands } from '../data/brands';
import './BrandsShowcase.css';

const BrandsShowcase: React.FC = () => {
    const { language, t } = useLanguage();

    return (
        <section id="brands" className="brands-section">
            <div className="brands-container">
                <div className="section-header">
                    <h2 className="section-title">{t('trustedBrands')}</h2>
                    <p className="section-subtitle">{t('brandsDescription')}</p>
                </div>

                <div className="brands-grid">
                    {brands.map((brand) => (
                        <div key={brand.id} className="brand-card">
                            <div className="brand-logo">
                                <span className="brand-initial">{brand.name.charAt(0)}</span>
                            </div>
                            <div className="brand-info">
                                <h3 className="brand-name">{brand.name}</h3>
                                <p className="brand-description">
                                    {language === 'en' ? brand.descriptionEn : brand.descriptionHi}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scrolling Brand Names */}
                <div className="brands-marquee">
                    <div className="marquee-content">
                        {[...brands, ...brands].map((brand, index) => (
                            <span key={index} className="marquee-item">
                                {brand.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandsShowcase;
