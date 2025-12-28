import type { Product } from '../types';
import { fetchProductsFromSheet } from '../services/googleSheets';

/**
 * Fetch products from Google Sheets
 * 
 * To use this:
 * 1. Create a Google Sheet with columns: id, nameEn, nameHi, category, subcategory, brand, 
 *    retailPrice, wholesalePrice, minWholesaleQty, available, image, featured
 * 2. Share the sheet publicly (Anyone with link can view)
 * 3. Enable Google Sheets API and create an API key
 * 4. Add credentials to .env.local:
 *    VITE_GOOGLE_SHEETS_API_KEY=your_api_key
 *    VITE_GOOGLE_SHEET_ID=your_sheet_id
 */
export async function fetchProducts(): Promise<Product[]> {
    return fetchProductsFromSheet();
}

// Helper function to get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
    const products = await fetchProducts();
    return products.filter(p => p.featured);
};

// Helper function to get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
    const products = await fetchProducts();
    return products.filter(p => p.category === categoryId);
};

// Helper function to get products by brand
export const getProductsByBrand = async (brandName: string): Promise<Product[]> => {
    const products = await fetchProducts();
    return products.filter(p => p.brand === brandName);
};

// Helper function to get available products only
export const getAvailableProducts = async (): Promise<Product[]> => {
    const products = await fetchProducts();
    return products.filter(p => p.available);
};
