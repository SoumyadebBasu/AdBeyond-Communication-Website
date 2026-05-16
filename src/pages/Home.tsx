import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, PlayCircle, FileText, Share2, BarChart3, GraduationCap, BookOpen, X,
  Compass, Sparkles, Star, Heart, Zap, Globe, Users, Lightbulb, Target, TrendingUp, 
  Award, Shield, MessageCircle, Camera, Video, PenTool, Layout,
  Megaphone, Search, Smartphone, MapPin, Mail, Phone, Printer
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAssetUrl, PortfolioItem } from '../lib/directus';
import { SpotlightButton } from '../components/SpotlightButton';
import { PortfolioModal } from '../components/PortfolioModal';
import { HoverMedia } from '../components/HoverMedia';
import { useGlobalSettings, useHomePage, useServices, usePortfolioFeaturedHome, useCreateContactMessage } from '../hooks/useDirectus';

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

export function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  // Custom API Hooks
  const { data: globalSettings } = useGlobalSettings();
  const { data: homeData, isLoading: isHomeLoading, isError: isHomeError } = useHomePage();
  const { data: services } = useServices(true);
  const { data: featuredPortfolio } = usePortfolioFeaturedHome();
  const contactMutation = useCreateContactMessage();

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // The specific AD-BEYOND map URL provided
  const DEFAULT_MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.0572069797377!2d88.47254367530502!3d22.72611497938271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8990f37593529%3A0xc2f5c8b7652830f!2sAD-BEYOND!5e0!3m2!1sen!2sin!4v1776075809952!5m2!1sen!2sin";

  // Helper to extract src from iframe or use the default map URL
  const getMapUrl = (embedUrl?: string) => {
    if (embedUrl && typeof embedUrl === 'string' && embedUrl.trim() !== '') {
      const cleanInput = embedUrl.trim();
      const srcMatch = cleanInput.match(/src=["'](.*?)["']/);
      const url = srcMatch && srcMatch[1] ? srcMatch[1] : cleanInput;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
    }
    return DEFAULT_MAP_URL;
  };

  // Contact form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    service_of_interest: '',
    message: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    contactMutation.mutate(formData, {
      onSuccess: () => {
        setSubmitSuccess(true);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          organization: '',
          service_of_interest: '',
          message: ''
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      },
      onError: () => {
        setSubmitError('Failed to send message. Please try again later.');
      }
    });
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    if (homeData?.testimonials && homeData.testimonials.length > 1) {
      const interval = setInterval(() => {
        setActiveTestimonialIndex((prev) => (prev + 1) % homeData.testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [homeData?.testimonials]);

  if (isHomeLoading || !homeData) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
  }
  
  if (isHomeError) {
    return <div className="min-h-screen flex items-center justify-center pt-20 text-red-500">Error loading content. Please refresh.</div>;
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center px-8 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <span className="inline-block py-1 px-3 mb-6 rounded-full bg-tertiary-container/20 text-tertiary-container text-[10px] font-bold tracking-[0.2em] uppercase">
              Marketing for Social Good
            </span>
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.95] mb-8">
              {homeData.hero_title_highlight ? 
                homeData.hero_title.split(new RegExp(`(${homeData.hero_title_highlight})`, 'gi')).map((part, i) => (
                  part.toLowerCase() === homeData.hero_title_highlight?.toLowerCase() 
                    ? <span key={i} className="text-primary">{part}</span> 
                    : part
                ))
                : homeData.hero_title
              }
            </h1>
            <p className="text-secondary text-xl md:text-2xl max-w-2xl leading-relaxed font-light mb-10">
              {homeData.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SpotlightButton 
                onClick={() => navigate('/portfolio')}
                className="bg-primary text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-wider text-sm hover:bg-primary-container transition-all"
              >
                View Our Portfolio
              </SpotlightButton>
              <button className="flex items-center gap-2 px-8 py-4 text-on-surface font-headline font-bold uppercase tracking-wider text-sm border-b-2 border-transparent hover:border-primary transition-all group">
                Our Method
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4 relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-surface-container-high relative">
              {homeData.hero_video_url ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover" 
                  src={homeData.hero_video_url.startsWith('http') ? homeData.hero_video_url : getAssetUrl(homeData.hero_video_url, false) || undefined}
                />
              ) : homeData.hero_image ? (
                <img 
                  alt="Hero Image" 
                  className="w-full h-full object-cover" 
                  src={getAssetUrl(homeData.hero_image) || undefined}
                />
              ) : (
                <img 
                  alt="Hero Image Default placeholder" 
                  className="w-full h-full object-cover" 
                  src="https://picsum.photos/seed/planting/800/1000" 
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="absolute -bottom-8 -left-8 p-6 bg-surface-container-lowest rounded-2xl shadow-xl max-w-[240px]">
              <p className="font-headline text-3xl font-black text-primary mb-1">{homeData.hero_stat_number || '120+'}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">{homeData.hero_stat_label || 'Global Non-Profits Empowered'}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery */}
      <section id="work" className="py-24 bg-surface-container-low px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase">{homeData.gallery_title || 'Project Gallery'}</h2>
              <div className="w-24 h-1.5 bg-primary"></div>
            </div>
            <p className="text-secondary max-w-sm font-medium leading-tight">
              {homeData.gallery_subtitle || 'A curated archive of strategic storytelling, digital engagement, and tactile brand experiences.'}
            </p>
          </div>

          {(featuredPortfolio || []).filter(item => item.category === 'reel').length > 0 && (
            <div className="mb-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(featuredPortfolio || []).filter(item => item.category === 'reel').slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    className="group relative overflow-hidden rounded-xl bg-neutral-900 aspect-[9/16] cursor-pointer"
                    onClick={() => {
                      const videoId = item.video_file ? (typeof item.video_file === 'string' ? item.video_file : item.video_file.id) : item.youtube_id;
                      if (videoId) {
                        if (activeVideo !== videoId) setActiveVideo(videoId);
                      } else {
                        setSelectedPortfolioItem(item);
                      }
                    }}
                  >
                    {activeVideo !== null && activeVideo === (item.video_file ? (typeof item.video_file === 'string' ? item.video_file : item.video_file.id) : item.youtube_id) ? (
                      item.video_file ? (
                        <video 
                          src={getAssetUrl(item.video_file, false) || undefined} 
                          autoPlay 
                          controls 
                          className="absolute inset-0 w-full h-full object-cover z-10 bg-black"
                        />
                      ) : item.youtube_id ? (
                        <iframe 
                          src={`https://www.youtube.com/embed/${item.youtube_id}?autoplay=1`} 
                          title={item.title} 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="absolute inset-0 w-full h-full z-10"
                        ></iframe>
                      ) : null
                    ) : (
                      <>
                        <HoverMedia item={item} imgClassName="transition-transform duration-700 group-hover:scale-105" disableHover={true} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"></div>
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none z-20">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                            <span className="bg-primary px-3 py-1 text-[10px] font-bold text-white uppercase w-fit rounded shadow-sm">
                              Reel
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                              <h3 className="font-headline text-2xl font-bold text-white mb-2">{item.title}</h3>
                              {item.description && <p className="text-white/80 font-light text-sm line-clamp-2">{item.description}</p>}
                            </div>
                            <div className="w-10 h-10 shrink-0 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm ml-4 shadow-xl">
                              <PlayCircle className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Justified Gallery for the rest of the items */}
          <div className="flex flex-wrap gap-3">
            {(featuredPortfolio || []).filter(item => item.category !== 'reel').map((item, i) => {
              const isLongVideo = item.category === 'long_video';
              const videoId = item.video_file ? (typeof item.video_file === 'string' ? item.video_file : item.video_file.id) : item.youtube_id;
              const isActive = activeVideo !== null && activeVideo === videoId && isLongVideo;

              return (
                <div 
                  key={`${item.category}-${item.id}-${i}`} 
                  className={`group relative overflow-hidden rounded-xl bg-neutral-900 cursor-pointer ${isLongVideo ? 'w-full sm:w-auto flex-none aspect-video h-auto sm:h-[300px] md:h-[350px]' : 'flex-grow basis-[280px] h-[300px] md:h-[350px]'}`}
                  onClick={() => {
                    if (isLongVideo && videoId) {
                      if (activeVideo !== videoId) setActiveVideo(videoId);
                    } else {
                      setSelectedPortfolioItem(item);
                    }
                  }}
                >
                  {isActive ? (
                    item.video_file ? (
                      <video 
                        src={getAssetUrl(item.video_file, false) || undefined} 
                        autoPlay 
                        controls 
                        className="absolute inset-0 w-full h-full object-cover z-10 bg-black"
                      />
                    ) : item.youtube_id ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${item.youtube_id}?autoplay=1`} 
                        title={item.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute inset-0 w-full h-full z-10 bg-black"
                      />
                    ) : null
                  ) : (
                    <>
                      <HoverMedia item={item} imgClassName="transition-transform duration-700 group-hover:scale-105" disableHover={item.category === 'reel' || item.category === 'long_video'} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"></div>
                      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none z-20">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                          <span className="bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase w-fit rounded border border-white/10 shadow-sm">
                            {item.category.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="font-headline text-2xl font-bold text-white mb-2">{item.title}</h3>
                            {item.description && <p className="text-white/80 font-light text-sm line-clamp-2 md:line-clamp-3 max-w-xl">{item.description}</p>}
                          </div>
                          {isLongVideo && (
                            <div className="w-12 h-12 shrink-0 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-xl">
                              <PlayCircle className="w-6 h-6 ml-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-24 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs bg-primary/5 px-4 py-1.5 rounded-full">Capabilities</span>
            <h2 className="font-headline text-5xl md:text-6xl font-black tracking-tighter mt-6">Services Showcase</h2>
            <p className="text-secondary mt-4 max-w-2xl mx-auto text-lg">Specialized strategic support designed exclusively for the unique needs of non-profit organizations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(services || []).map((service, index) => (
              <Link 
                key={service.id} 
                to={`/services/${service.slug || 'social-media'}`}
                className="group relative bg-primary/5 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:bg-primary/10 border border-primary/10 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    {iconMap[service.home_icon?.toLowerCase()] || <Share2 className="w-8 h-8" />}
                  </div>
                  <div className="text-primary/20 font-headline text-6xl font-black absolute top-4 right-4">0{index + 1}</div>
                  <h3 className="font-headline text-3xl font-extrabold mb-4 text-on-surface">{service.title}</h3>
                  <p className="text-secondary leading-relaxed mb-8 max-w-sm">{service.short_description}</p>
                  {service.tags && service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(service.tags || []).map((tagObj, i) => {
                        const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                        return tagText ? (
                          <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-primary border border-primary/10 shadow-sm">
                            {tagText}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      alt={service.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                      src={getAssetUrl(service.home_image)} 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-8 bg-surface-container-low border-y border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-primary font-bold tracking-widest uppercase mb-4 text-sm">{homeData.about_title || 'About Us'}</h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold leading-tight mb-6">
                {homeData.about_headline || 'Pioneering Social Impact Through Strategy & Design'}
              </h3>
              <p className="text-lg text-secondary leading-relaxed mb-8">
                {homeData.about_description || 'We are a mission-driven communications agency dedicated to amplifying the voices of non-profits, social enterprises, and changemakers globally. By blending deep strategic insight with world-class design, we help organizations transform complexity into compelling narratives that drive real-world action.'}
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-neutral-200 pt-8">
                <div>
                  <div className="text-4xl font-headline font-bold text-primary mb-2">{homeData.about_stat_1_number || '10+'}</div>
                  <div className="text-sm text-secondary font-medium uppercase tracking-wider">{homeData.about_stat_1_label || 'Years of Impact'}</div>
                </div>
                <div>
                  <div className="text-4xl font-headline font-bold text-primary mb-2">{homeData.about_stat_2_number || '500+'}</div>
                  <div className="text-sm text-secondary font-medium uppercase tracking-wider">{homeData.about_stat_2_label || 'Projects Delivered'}</div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={homeData.about_image ? getAssetUrl(homeData.about_image) : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"} 
                alt={homeData.about_headline || "Adbeyond Team Collaboration"} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-8 bg-neutral-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-primary flex-grow"></div>
            <h2 className="font-headline text-xl font-bold uppercase tracking-widest text-primary">Our Partners</h2>
            <div className="h-px bg-primary flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8 relative min-h-[300px]">
              <div className="text-editorial-glow h-full">
                <span className="text-primary text-5xl mb-6 block">"</span>
                
                <AnimatePresence mode="wait">
                  {homeData.testimonials && homeData.testimonials.length > 0 && (
                    <motion.div
                      key={activeTestimonialIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <p className="text-3xl font-light leading-snug mb-8 min-h-[160px]">
                        {homeData.testimonials[activeTestimonialIndex].highlight 
                          ? homeData.testimonials[activeTestimonialIndex].quote?.split(homeData.testimonials[activeTestimonialIndex].highlight).map((part: string, i: number, arr: any[]) => (
                              <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="text-primary font-bold">{homeData.testimonials[activeTestimonialIndex].highlight}</span>}
                              </React.Fragment>
                            ))
                          : homeData.testimonials[activeTestimonialIndex].quote
                        }
                      </p>
                      <div className="flex items-center gap-4">
                        {homeData.testimonials[activeTestimonialIndex].image && (
                          <img 
                            src={getAssetUrl(homeData.testimonials[activeTestimonialIndex].image)} 
                            alt={homeData.testimonials[activeTestimonialIndex].author} 
                            className="w-12 h-12 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div>
                          <h4 className="font-headline font-bold text-lg">{homeData.testimonials[activeTestimonialIndex].author}</h4>
                          <p className="text-neutral-500 uppercase text-xs tracking-widest font-bold mt-1">{homeData.testimonials[activeTestimonialIndex].role}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Optional pager dots if there are multiple */}
                {homeData.testimonials && homeData.testimonials.length > 1 && (
                  <div className="flex gap-2 mt-8">
                    {homeData.testimonials.map((_: any, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveTestimonialIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeTestimonialIndex ? 'bg-primary w-6' : 'bg-neutral-700 hover:bg-neutral-500'}`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 items-center">
              {(homeData.trusted_partners?.length ? homeData.trusted_partners : homeData.trusted_by)?.map((partner, i) => (
                <div key={i} className="h-24 md:h-32 lg:h-40 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-500 group">
                  {partner.logo ? (
                    <img 
                      src={getAssetUrl(partner.logo)} 
                      alt={partner.name} 
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-95 group-hover:scale-105"
                    />
                  ) : (
                    <span className="font-headline text-3xl md:text-4xl font-black tracking-tighter uppercase text-center transition-all duration-500 scale-95 group-hover:scale-105">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info & Map */}
            <div className="space-y-10">
              <div>
                <h2 className="font-headline text-5xl font-black tracking-tighter mb-4">Get in Touch</h2>
                <p className="text-secondary text-lg">Have a project in mind? We'd love to hear about it. Reach out to us directly or fill out the form.</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold font-headline uppercase tracking-widest text-sm mb-1">Visit Us</h4>
                    <p className="text-secondary whitespace-pre-line">{globalSettings?.contact_address || 'AD-BEYOND\nKolkata, West Bengal, India'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold font-headline uppercase tracking-widest text-sm mb-1">Email Us</h4>
                    <a href={`mailto:${globalSettings?.contact_email || 'hello@adbeyond.org'}`} className="text-secondary hover:text-primary transition-colors">
                      {globalSettings?.contact_email || 'hello@adbeyond.org'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold font-headline uppercase tracking-widest text-sm mb-1">Call Us</h4>
                    <a href={`tel:${globalSettings?.contact_phone || '+1 (555) 123-4567'}`} className="text-secondary hover:text-primary transition-colors block">
                      {globalSettings?.contact_phone || '+1 (555) 123-4567'}
                    </a>
                    {globalSettings?.contact_phone_2 && (
                      <a href={`tel:${globalSettings.contact_phone_2}`} className="text-secondary hover:text-primary transition-colors block mt-1">
                        {globalSettings.contact_phone_2}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="w-full h-64 bg-neutral-200 rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
                <iframe 
                  src={getMapUrl(globalSettings?.map_embed_url)} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-surface-container-lowest rounded-[2rem] p-10 shadow-sm border border-neutral-100">
              <div className="mb-8">
                <h3 className="font-headline text-3xl font-black tracking-tighter mb-2">Let's Build Impact Together</h3>
                <p className="text-secondary">Ready to amplify your mission? Tell us about your vision.</p>
              </div>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-1">Full Name *</label>
                    <input 
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" 
                      placeholder="John Doe" 
                      type="text" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-1">Email Address *</label>
                    <input 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" 
                      placeholder="john@example.com" 
                      type="email" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-1">Phone Number</label>
                    <input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" 
                      placeholder="+1 (555) 000-0000" 
                      type="tel" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-1">Organization</label>
                    <input 
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" 
                      placeholder="NGO Name" 
                      type="text" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-1">Service of Interest</label>
                  <select 
                    value={formData.service_of_interest}
                    onChange={(e) => setFormData({...formData, service_of_interest: e.target.value})}
                    className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all appearance-none"
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="General Inquiry">General Inquiry</option>
                    {(services || []).map((service) => (
                      <option key={service.id} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 px-1">Project Message</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-surface-container-high border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" 
                    placeholder="Briefly describe your objectives..." 
                    rows={4}
                  ></textarea>
                </div>
                
                {submitSuccess && (
                  <div className="bg-green-50 text-green-800 p-4 rounded-xl text-sm font-medium border border-green-200">
                    Thank you! Your message has been sent successfully. We will be in touch soon.
                  </div>
                )}
                
                {submitError && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm font-medium border border-red-200">
                    {submitError}
                  </div>
                )}

                <button 
                  disabled={contactMutation.isPending}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-5 rounded-xl font-headline font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {contactMutation.isPending ? 'Sending...' : 'Initiate Consultation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PortfolioModal 
        item={selectedPortfolioItem} 
        onClose={() => setSelectedPortfolioItem(null)} 
      />
    </div>
  );
}
