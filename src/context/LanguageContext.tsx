import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import type { TranslationKey } from '../data/translations';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    // Initialize from localStorage or default to Hindi for local audience
    const [language, setLanguage] = useState<Language>(() => {
        try {
            const saved = localStorage.getItem('verity-store-language');
            return (saved as Language) || 'hi';
        } catch {
            return 'hi';
        }
    });

    // Save to localStorage when language changes
    useEffect(() => {
        localStorage.setItem('verity-store-language', language);
        // Update document lang attribute for accessibility
        document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
    };

    // Translation function
    const t = (key: TranslationKey): string => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }
        return translation[language];
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook for using language context
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
