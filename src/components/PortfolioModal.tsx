import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetUrl, PortfolioItem } from '../lib/directus';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const slides = item ? [
    { 
      image: item.image, 
      video_file: item.video_file,
      youtube_id: item.youtube_id,
      title: item.title, 
      description: item.description 
    },
    ...(item.sub_images || [])
  ] : [];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
      setTimeout(checkScroll, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  useEffect(() => {
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth'
      });
    }
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-black w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl relative overflow-hidden flex"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors text-white backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Navigation */}
        {slides.length > 1 && canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 hover:bg-black/80 rounded-full transition-colors text-white backdrop-blur-md"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Right Navigation */}
        {slides.length > 1 && canScrollRight && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 hover:bg-black/80 rounded-full transition-colors text-white backdrop-blur-md"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative flex items-center justify-center">
              {slide.video_file ? (
                <video 
                  src={getAssetUrl(slide.video_file, false) || undefined} 
                  autoPlay 
                  controls 
                  className="absolute inset-0 w-full h-full object-contain bg-black z-0"
                />
              ) : slide.youtube_id ? (
                <iframe 
                  src={`https://www.youtube.com/embed/${slide.youtube_id}?autoplay=1`} 
                  title={slide.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full bg-black z-0 border-none"
                />
              ) : slide.image ? (
                <img 
                  src={getAssetUrl(slide.image) || undefined} 
                  alt={slide.title || `Slide ${idx + 1}`} 
                  className="absolute inset-0 w-full h-full object-contain z-0"
                />
              ) : null}
              
              {/* Added pointer-events-none so it doesn't block video controls */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent pt-32 px-8 pb-8 md:px-16 md:pb-16 flex flex-col justify-end pointer-events-none z-10">
                {slide.title && <h3 className="font-headline text-2xl font-bold text-white mb-2 drop-shadow-md">{slide.title}</h3>}
                {slide.description && (
                  <p className="text-white/90 font-medium text-sm line-clamp-2 max-w-3xl drop-shadow">
                    {slide.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
