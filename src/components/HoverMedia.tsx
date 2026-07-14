import React, { useState } from 'react';
import { getAssetUrl, getAssetSrcSet, PortfolioItem } from '../lib/directus';

export const HoverMedia = ({ item, imgClassName, disableHover = false }: { item: PortfolioItem, imgClassName?: string, disableHover?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasVideo = !disableHover && !!(item.video_file || item.youtube_id);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasVideo && isHovered && (
        <div className="absolute inset-0 z-0 bg-black animate-in fade-in duration-500">
          {item.video_file ? (
            <video 
              src={getAssetUrl(item.video_file, false) || undefined} 
              autoPlay 
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : item.youtube_id ? (
            <iframe 
              src={`https://www.youtube.com/embed/${item.youtube_id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtube_id}&rel=0&showinfo=0`} 
              title={item.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              className="w-full h-full scale-[1.35] pointer-events-none"
            ></iframe>
          ) : null}
        </div>
      )}
      <img 
        className={`${imgClassName || ''} absolute inset-0 w-full h-full object-cover ${hasVideo && isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 z-10 pointer-events-none`} 
        alt={item.title || 'Portfolio item'} 
        src={getAssetUrl(item.image) || undefined}
        srcSet={getAssetSrcSet(item.image) || undefined}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

