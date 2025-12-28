// Product Types
export interface Product {
  id: number;
  nameEn: string;
  nameHi: string;
  category: string;
  subcategory: string;
  brand: string;
  retailPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number;
  available: boolean;
  image: string;
  featured?: boolean;
}

// Brand Types
export interface Brand {
  id: number;
  name: string;
  logo: string;
  descriptionEn: string;
  descriptionHi: string;
}

// Category Types
export interface Subcategory {
  id: string;
  nameEn: string;
  nameHi: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  subcategories: Subcategory[];
}

// Language Types
export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}
