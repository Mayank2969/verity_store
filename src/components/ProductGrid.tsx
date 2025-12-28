import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchProducts } from '../data/products';
import { categories } from '../data/categories';
import { brands } from '../data/brands';
import ProductCard from './ProductCard';
import { fuzzySearchMultiple } from '../utils/fuzzySearch';
import type { Product } from '../types';
import './ProductGrid.css';

const ProductGrid: React.FC = () => {
    const { language, t } = useLanguage();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedBrand, setSelectedBrand] = useState<string>('all');
    const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Fetch products from Google Sheets on mount
    useEffect(() => {
        fetchProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to load products from Google Sheets');
                setLoading(false);
            });
    }, []);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Category filter
            if (selectedCategory !== 'all' && product.category !== selectedCategory) {
                return false;
            }

            // Brand filter
            if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
                return false;
            }

            // Availability filter
            if (showAvailableOnly && !product.available) {
                return false;
            }

            // Search filter with fuzzy matching
            if (searchQuery) {
                const query = searchQuery.toLowerCase();

                // Collect all searchable fields
                const searchTargets = [
                    product.nameEn,
                    product.nameHi,
                    product.brand,
                ];

                // Use fuzzy search with 60% similarity threshold
                const matches = fuzzySearchMultiple(query, searchTargets, 0.6);

                if (!matches) {
                    return false;
                }
            }

            return true;
        });
    }, [products, selectedCategory, selectedBrand, showAvailableOnly, searchQuery]);

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedBrand('all');
        setShowAvailableOnly(false);
        setSearchQuery('');
    };

    const hasActiveFilters =
        selectedCategory !== 'all' ||
        selectedBrand !== 'all' ||
        showAvailableOnly ||
        searchQuery;

    // Show loading state
    if (loading) {
        return (
            <section id="products" className="products-section">
                <div className="products-container">
                    <div className="section-header">
                        <h2 className="section-title">{t('ourProducts')}</h2>
                    </div>
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                            Loading products from Google Sheets...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Show error state
    if (error) {
        return (
            <section id="products" className="products-section">
                <div className="products-container">
                    <div className="section-header">
                        <h2 className="section-title">{t('ourProducts')}</h2>
                    </div>
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ fontSize: '1.2rem', color: '#e74c3c', marginBottom: '1rem' }}>
                            ⚠️ {error}
                        </p>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Please check your Google Sheets API configuration in .env.local
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="products" className="products-section">
            <div className="products-container">
                {/* Section Header */}
                <div className="section-header">
                    <h2 className="section-title">{t('ourProducts')}</h2>
                </div>

                {/* Filters */}
                <div className="filters">
                    {/* Search */}
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder={t('searchProducts')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="filter-group">
                        <label className="filter-label">{t('filterByCategory')}</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">{t('allCategories')}</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {language === 'en' ? cat.nameEn : cat.nameHi}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand Filter */}
                    <div className="filter-group">
                        <label className="filter-label">{t('filterByBrand')}</label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">{t('allBrands')}</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.name}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Availability Toggle */}
                    <label className="availability-toggle">
                        <input
                            type="checkbox"
                            checked={showAvailableOnly}
                            onChange={(e) => setShowAvailableOnly(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        <span className="toggle-label">{t('showAvailableOnly')}</span>
                    </label>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <button className="clear-filters" onClick={clearFilters}>
                            ✕ {t('clearFilters')}
                        </button>
                    )}
                </div>

                {/* Category Pills (Quick Access) */}
                <div className="category-pills">
                    <button
                        className={`category-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        📦 {t('allCategories')}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.icon} {language === 'en' ? cat.nameEn : cat.nameHi}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <span className="no-products-icon">😔</span>
                        <p className="no-products-text">{t('noProductsFound')}</p>
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            {t('clearFilters')}
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="results-count">
                    {filteredProducts.length} / {products.length} {t('products')}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
