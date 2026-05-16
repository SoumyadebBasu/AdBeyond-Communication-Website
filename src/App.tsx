import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { ServicePage } from './pages/ServicePage';
import { Checklist } from './pages/Checklist';
import { Portfolio } from './pages/Portfolio';
import { getAssetUrl } from './lib/directus';
import { useGlobalSettings } from './hooks/useDirectus';

export default function App() {
  const { data: settings, isLoading } = useGlobalSettings();

  useEffect(() => {
    if (settings?.site_title) {
      document.title = settings.site_title;
    }
    
    if (settings?.favicon) {
      const faviconUrl = getAssetUrl(settings.favicon);
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [settings]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface">Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative">
        <Navbar logoUrl={settings?.logo ? getAssetUrl(settings.logo) : "/logo.png"} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/checklist" element={<Checklist />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton 
          phoneNumber={settings?.whatsapp_number} 
          message={settings?.whatsapp_message} 
        />
      </div>
    </Router>
  );
}
