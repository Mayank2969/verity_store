import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { language, t } = useLanguage();

    const productName = language === 'en' ? product.nameEn : product.nameHi;

    return (
        <div className={`product-card ${!product.available ? 'out-of-stock' : ''}`}>
            {/* Featured Badge */}
            {product.featured && (
                <span className="featured-badge">{t('featured')}</span>
            )}

            {/* Availability Badge */}
            <span className={`availability-badge ${product.available ? 'in-stock' : 'unavailable'}`}>
                {product.available ? t('inStock') : t('outOfStock')}
            </span>

            {/* Product Image */}
            <div className="product-image">
                <img
                    src={product.image}
                    alt={productName}
                    loading="lazy"
                />
                <div className="product-overlay">
                    <span className="brand-tag">{product.brand}</span>
                </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
                <h3 className="product-name">{productName}</h3>

                {/* Pricing */}
                <div className="product-pricing">
                    <div className="price-row retail">
                        <span className="price-label">{t('retailPrice')}:</span>
                        <span className="price-value">₹{product.retailPrice}</span>
                    </div>
                    <div className="price-row wholesale">
                        <span className="price-label">{t('wholesalePrice')}:</span>
                        <span className="price-value">₹{product.wholesalePrice}</span>
                        <span className="min-qty">
                            ({t('minQuantity')}: {product.minWholesaleQty} {t('pieces')})
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
