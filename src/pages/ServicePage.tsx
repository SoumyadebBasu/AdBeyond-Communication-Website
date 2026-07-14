import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, Sparkles, BarChart3, Share2, GraduationCap, BookOpen, 
  Star, Heart, Zap, Globe, Users, Lightbulb, Target, TrendingUp, 
  Award, Shield, MessageCircle, Camera, Video, PenTool, Layout,
  Megaphone, Search, Smartphone, Printer
} from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { getAssetUrl, getAssetSrcSet, PortfolioItem, Service } from '../lib/directus';
import { SpotlightCard } from '../components/SpotlightCard';
import { SpotlightButton } from '../components/SpotlightButton';
import { PortfolioModal } from '../components/PortfolioModal';
import { useServiceBySlug, usePortfolioFeaturedService } from '../hooks/useDirectus';

const iconMap: Record<string, React.ReactNode> = {
  'compass': <Compass className="w-8 h-8" />,
  'sparkles': <Sparkles className="w-8 h-8" />,
  'barchart3': <BarChart3 className="w-8 h-8" />,
  'share2': <Share2 className="w-8 h-8" />,
  'graduationcap': <GraduationCap className="w-8 h-8" />,
  'bookopen': <BookOpen className="w-8 h-8" />,
  'star': <Star className="w-8 h-8" />,
  'heart': <Heart className="w-8 h-8" />,
  'zap': <Zap className="w-8 h-8" />,
  'globe': <Globe className="w-8 h-8" />,
  'users': <Users className="w-8 h-8" />,
  'lightbulb': <Lightbulb className="w-8 h-8" />,
  'target': <Target className="w-8 h-8" />,
  'trendingup': <TrendingUp className="w-8 h-8" />,
  'award': <Award className="w-8 h-8" />,
  'shield': <Shield className="w-8 h-8" />,
  'messagecircle': <MessageCircle className="w-8 h-8" />,
  'camera': <Camera className="w-8 h-8" />,
  'video': <Video className="w-8 h-8" />,
  'pentool': <PenTool className="w-8 h-8" />,
  'layout': <Layout className="w-8 h-8" />,
  'megaphone': <Megaphone className="w-8 h-8" />,
  'search': <Search className="w-8 h-8" />,
  'smartphone': <Smartphone className="w-8 h-8" />,
  'printer': <Printer className="w-8 h-8" />,
};

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const { data: serviceData, isLoading: isServiceLoading } = useServiceBySlug(slug);

  const categoryMap: Record<string, string[]> = {
    'social-media-videography': ['reel', 'long_video', 'image_post', 'videography'],
    'paper-printing-design': ['print', 'newsletter'],
    'org-profiles-reports': ['report'],
    'capacity-building-training': ['training']
  };
  const relevantCategories = slug ? categoryMap[slug] || [] : [];
  
  const { data: featuredItems, isLoading: isFeaturedLoading } = usePortfolioFeaturedService(relevantCategories);

  if (isServiceLoading || isFeaturedLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
  }

  if (!serviceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
        <h1 className="text-4xl font-headline font-black mb-4">Service Not Found</h1>
        <p className="text-secondary mb-8">We couldn't find a service matching "{slug}".</p>
        <SpotlightButton 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-8 py-4 rounded-xl font-headline font-bold"
        >
          Return Home
        </SpotlightButton>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative px-8 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6 z-10"
          >
            <span className="text-primary font-headline font-extrabold tracking-widest text-xs uppercase mb-4 block">Strategic Impact</span>
            <h1 className="text-[clamp(2.5rem,8vw,4rem)] md:text-5xl lg:text-6xl xl:text-7xl font-headline font-black tracking-tighter text-on-surface leading-[0.95] mb-6 break-words" style={{ hyphenateCharacter: "auto" }}>
              {serviceData.title.split(' ').slice(0, -1).join(' ')} <br className="hidden sm:block" /><span className="text-primary">{serviceData.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-lg text-secondary leading-relaxed mb-10 max-w-md">
              {serviceData.hero_subtitle || serviceData.short_description}
            </p>
            <SpotlightButton 
              onClick={() => navigate('/#contact')}
              className="bg-primary text-white px-8 py-4 rounded-xl font-headline font-bold text-base shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              Start Your Campaign
            </SpotlightButton>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6 relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-surface-container-low relative">
              <img 
                className="w-full h-full object-cover" 
                src={getAssetUrl(serviceData.hero_image)} 
                srcSet={getAssetSrcSet(serviceData.hero_image)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                alt={serviceData.title}
              />
            </div>
            {serviceData.stat_number && (
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary-container/20 rounded-xl flex items-center justify-center text-tertiary-container">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-headline font-black text-3xl text-on-surface">{serviceData.stat_number}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">{serviceData.stat_label}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      {serviceData.cards && serviceData.cards.length > 0 && (
        <section className="bg-surface-container-low py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-headline font-extrabold tracking-tight mb-4">{serviceData.cards_section_title || 'Our Methodology'}</h2>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceData.cards.map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-xl hover:shadow-xl transition-all duration-500 group">
                  <div className="text-primary mb-8 group-hover:scale-110 transition-transform origin-left">
                    {iconMap[item.icon?.toLowerCase()] || <Compass className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-4 tracking-tight uppercase">{item.title}</h3>
                  <p className="text-secondary leading-relaxed">{item.description}</p>
                  {item.features && item.features.length > 0 && (
                    <ul className="mt-6 space-y-2">
                      {item.features.map((feat, idx) => {
                        const featText = typeof feat === 'string' ? feat : feat.feature;
                        return featText ? (
                          <li key={idx} className="flex items-start gap-2 text-secondary">
                            <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                            <span className="text-sm font-medium">{featText}</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Campaigns Gallery */}
      {(featuredItems || []).length > 0 && (
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">{serviceData.gallery_label || 'Creative Showcase'}</span>
              <h2 className="text-4xl font-headline font-black tracking-tighter">{serviceData.gallery_section_title || 'Featured Campaigns'}</h2>
            </div>
            {serviceData.gallery_section_subtitle && (
              <div className="max-w-md md:text-right">
                <p className="text-neutral-500 text-sm leading-relaxed italic">
                  {serviceData.gallery_section_subtitle}
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(featuredItems || []).map((item) => {
              const isNewsletter = item.category === 'newsletter';
              return (
                <div 
                  key={item.id} 
                  className={cn(
                    "group relative overflow-hidden rounded-3xl bg-neutral-900 cursor-pointer",
                    isNewsletter ? 'md:col-span-2 aspect-[3/1]' : (item.category === 'image_post' ? 'aspect-[5/4]' : 'aspect-[3/4]')
                  )}
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" 
                    src={getAssetUrl(item.image)} 
                    srcSet={getAssetSrcSet(item.image)}
                    sizes={isNewsletter ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                    referrerPolicy="no-referrer"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-white font-headline font-bold text-xl mb-2">{item.title}</h3>
                    {item.category === 'videography' && item.description ? (
                      <div className="mt-2 text-white/80 text-sm font-medium line-clamp-2 lg:line-clamp-3">
                         {item.description}
                      </div>
                    ) : (
                      <div className="mt-4 flex items-center gap-2 text-white/80 text-[10px] font-bold tracking-widest uppercase">
                        {item.category !== 'image_post' && item.category !== 'print' && item.category !== 'videography' && <PlayCircle className="w-4 h-4" />}
                        {item.category.replace('_', ' ')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <SpotlightCard spotlightSize={200}>
          <h2 className="text-[clamp(1.75rem,4.5vw,3.75rem)] font-headline font-black mb-6 uppercase leading-[1.1] tracking-tight">
            {serviceData.cta_title || (
              <>Digital growth, <br />tailored to your needs.</>
            )}
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            {serviceData.cta_subtitle || "No rigid packages. Just flexible, requirement-driven digital support designed to help your non-profit thrive."}
          </p>
          <SpotlightButton 
            onClick={() => navigate('/#contact')}
            className="bg-white text-primary px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-neutral-100 transition-colors shadow-md"
          >
            {serviceData.cta_button_text || "Start Your Tailored Plan"}
          </SpotlightButton>
        </SpotlightCard>
      </section>

      <PortfolioModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}

function PlayCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}
