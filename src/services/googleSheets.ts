/**
 * Google Sheets API Service
 * Fetches product data from a Google Spreadsheet
 */

import type { Product } from '../types';

const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const SHEET_NAME = 'Products';

/**
 * Fetch products from Google Sheets
 * Sheet must have columns: id, nameEn, nameHi, category, subcategory, brand, 
 * retailPrice, wholesalePrice, minWholesaleQty, available, image, featured
 */
export async function fetchProductsFromSheet(): Promise<Product[]> {
    if (!API_KEY || !SHEET_ID) {
        throw new Error(
            'Google Sheets API credentials not configured. Please set VITE_GOOGLE_SHEETS_API_KEY and VITE_GOOGLE_SHEET_ID in .env.local'
        );
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Google Sheets API error:', errorData);
            throw new Error(`Failed to fetch from Google Sheets: ${response.statusText}`);
        }

        const data = await response.json();
        const rows = data.values;

        if (!rows || rows.length === 0) {
            console.warn('No data found in Google Sheet');
            return [];
        }

        // First row is headers, skip it
        const products: Product[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];

            // Skip empty rows
            if (!row || row.length === 0 || !row[0]) {
                continue;
            }

            try {
                const product: Product = {
                    id: parseInt(row[0]) || i,
                    nameEn: row[1] || '',
                    nameHi: row[2] || '',
                    category: row[3] || '',
                    subcategory: row[4] || '',
                    brand: row[5] || '',
                    retailPrice: parseFloat(row[6]) || 0,
                    wholesalePrice: parseFloat(row[7]) || 0,
                    minWholesaleQty: parseInt(row[8]) || 1,
                    available: row[9]?.toString().toUpperCase() === 'TRUE',
                    image: row[10] || '',
                    featured: row[11]?.toString().toUpperCase() === 'TRUE',
                };

                products.push(product);
            } catch (error) {
                console.error(`Error parsing row ${i}:`, error, row);
                // Continue with next row
            }
        }

        console.log(`Loaded ${products.length} products from Google Sheets`);
        return products;
    } catch (error) {
        console.error('Error fetching from Google Sheets:', error);
        throw error;
    }
}
