import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandsShowcase from './components/BrandsShowcase';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <BrandsShowcase />
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
