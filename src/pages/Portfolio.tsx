import React, { useEffect, useState } from 'react';
import { Play, PlayCircle, ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import { SpotlightButton } from '../components/SpotlightButton';
import { directus, getAssetUrl, PortfolioItem } from '../lib/directus';
import { readItems } from '@directus/sdk';
import { PortfolioModal } from '../components/PortfolioModal';
import { HoverMedia } from '../components/HoverMedia';
import { Link } from 'react-router-dom';

interface ServiceData {
  title: string;
  slug: string;
  short_description: string;
  tags?: any[];
}

export function Portfolio() {
  const [services, setServices] = useState<Record<string, ServiceData>>({});
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const svcs = await directus.request(readItems('services', {
          fields: ['title', 'slug', 'short_description', 'tags']
        }));
        const servicesMap = svcs.reduce((acc, curr) => {
          if (curr.slug) {
            acc[curr.slug] = curr as ServiceData;
          }
          return acc;
        }, {} as Record<string, ServiceData>);
        setServices(servicesMap);

        const items = await directus.request(readItems('portfolio_items', {
          filter: {
            is_featured_on_portfolio_page: { _eq: true }
          },
          fields: ['id', 'title', 'description', 'youtube_id', 'video_file', 'image', 'category', 'is_featured_on_home', 'sort', 'sub_images.*'] as any,
          sort: ['sort']
        }));
        setPortfolioItems(items as any as PortfolioItem[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const getService = (slug: string, fallbackTitle: string, fallbackDesc: string) => {
    const svc = services[slug];
    return {
      slug: slug,
      title: svc?.title || fallbackTitle,
      desc: svc?.short_description || fallbackDesc,
      tags: svc?.tags || []
    };
  };

  const socialMedia = getService('social-media-videography', 'Social Media & Videography', 'Dynamic social media assets and compelling visual storytelling crafted to amplify your organization’s voice.');
  const orgProfiles = getService('org-profiles-reports', 'Organization Profiles and Reports', 'Professional, engaging documents that visualize your data and bring your organization\'s story to life.');
  const capacityBuilding = getService('capacity-building-training', 'Capacity Building', 'Expert-led training sessions covering everything from basic computer operations to advanced AI use and mobile cinematography.');
  const printDesign = getService('paper-printing-design', 'Printing & Design', 'High-impact posters, brochures, banners and standee designed for maximum visibility in key locations and absolute fundraising clarity.');

  const socialMediaItems = (portfolioItems || []).filter(item => item.category === 'reel' || item.category === 'long_video' || item.category === 'image_post' || item.category === 'videography');

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="px-8 py-20 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8">
              <h1 className="text-[clamp(3rem,18vw,8rem)] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-headline font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.95] sm:leading-[0.9]">
                Our <br className="block sm:hidden" />Impact <br/><span className="text-primary">in Action</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary max-w-2xl leading-relaxed">
                Architecting digital narratives that amplify non-profit missions. From global conservation to local urban renewal, we design the catalysts for change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Reels Gallery */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-headline font-bold tracking-tight mb-4">{socialMedia.title}</h2>
            <p className="text-secondary leading-relaxed max-w-2xl">{socialMedia.desc}</p>
            <div className="flex flex-wrap items-center justify-between gap-6 mt-8 border-t border-primary/10 pt-6">
              <div className="flex flex-wrap gap-2">
                {(socialMedia.tags || []).map((tagObj, i) => {
                  const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                  return tagText ? (
                     <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-primary border border-primary/10 shadow-sm">
                      {tagText}
                    </span>
                  ) : null;
                })}
              </div>
              <Link to={`/services/${socialMedia.slug}`} className="shrink-0 inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all group">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialMediaItems.length > 0 ? socialMediaItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm cursor-pointer"
                onClick={() => {
                  const videoId = item.video_file ? (typeof item.video_file === 'string' ? item.video_file : item.video_file.id) : item.youtube_id;
                  if (videoId && item.category !== 'image_post') {
                    if (activeVideo !== videoId) {
                      setActiveVideo(videoId);
                    }
                  } else {
                    setSelectedPortfolioItem(item);
                  }
                }}
              >
                <div className={`w-full relative overflow-hidden ${item.category === 'image_post' ? 'aspect-[5/4]' : (item.category === 'long_video' || item.category === 'videography') ? 'aspect-video' : 'aspect-[9/16]'}`}>
                  {activeVideo !== null && activeVideo === (item.video_file ? (typeof item.video_file === 'string' ? item.video_file : item.video_file.id) : item.youtube_id) && item.category !== 'image_post' ? (
                    item.video_file ? (
                      <video 
                        src={getAssetUrl(item.video_file, false) || undefined} 
                        autoPlay 
                        controls 
                        className="absolute inset-0 w-full h-full object-cover z-20 bg-black"
                      />
                    ) : item.youtube_id ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${item.youtube_id}?autoplay=1`} 
                        title={item.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="absolute inset-0 w-full h-full z-20"
                      ></iframe>
                    ) : null
                  ) : (
                    <>
                      <HoverMedia item={item} imgClassName="transition-transform duration-500 group-hover:scale-105" disableHover={item.category === 'reel' || item.category === 'long_video'} />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col ${item.category === 'videography' ? 'justify-end' : 'justify-between'} pointer-events-none z-20`}>
                        {item.category !== 'videography' && (
                          <span className="bg-primary px-3 py-1 text-[10px] font-bold text-white uppercase w-fit rounded">
                            {item.category === 'image_post' ? 'Image Post' : item.category === 'long_video' ? 'Long Video' : 'Reel'}
                          </span>
                        )}
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="font-headline text-2xl font-bold text-white mb-2">{item.title}</h3>
                            {item.description && <p className="text-white/80 font-light text-sm line-clamp-2">{item.description}</p>}
                          </div>
                          {item.category !== 'image_post' && item.category !== 'videography' && (
                            <div className="w-10 h-10 shrink-0 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-sm ml-4">
                              <PlayCircle className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-12 text-secondary">
                No social media items available yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Organization & Impact Reports Grid */}
      <section className="px-8 py-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-headline font-bold mb-6">{orgProfiles.title}</h2>
              <p className="text-secondary leading-relaxed mb-8">{orgProfiles.desc}</p>
              <div className="flex flex-col gap-6 border-t border-primary/10 pt-6">
                <div className="flex flex-wrap gap-2">
                  {(orgProfiles.tags || []).map((tagObj, i) => {
                    const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                    return tagText ? (
                      <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-primary border border-primary/10 shadow-sm">
                        {tagText}
                      </span>
                    ) : null;
                  })}
                </div>
                <div>
                  <Link to={`/services/${orgProfiles.slug}`} className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all group">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
              {(portfolioItems || []).filter(item => item.category === 'report').map((report) => (
                <div 
                  key={report.id} 
                  className="group cursor-pointer"
                  onClick={() => setSelectedPortfolioItem(report)}
                >
                  <div className="relative aspect-[3/4] bg-surface-container-high rounded-lg overflow-hidden mb-4 shadow-sm hover:shadow-lg transition-all duration-300">
                    <HoverMedia item={report} />
                  </div>
                  <h4 className="font-bold text-sm">{report.title}</h4>
                  {report.description && <p className="text-xs text-secondary line-clamp-1">{report.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Building Section */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-headline font-bold mb-6">{capacityBuilding.title}</h2>
              <p className="text-secondary leading-relaxed mb-8">{capacityBuilding.desc}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8 border-t border-primary/10 pt-6">
                <div className="flex flex-wrap gap-2">
                  {(capacityBuilding.tags || []).map((tagObj, i) => {
                    const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                    return tagText ? (
                      <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-primary border border-primary/10 shadow-sm">
                        {tagText}
                      </span>
                    ) : null;
                  })}
                </div>
                <Link to={`/services/${capacityBuilding.slug}`} className="shrink-0 inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(portfolioItems || []).filter(item => item.category === 'training').map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`relative rounded-xl overflow-hidden h-64 cursor-pointer hover:opacity-90 transition-opacity ${idx === 0 ? 'mt-8' : ''}`}
                  onClick={() => setSelectedPortfolioItem(item)}
                >
                  <HoverMedia item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Print Design Gallery */}
      <section className="px-8 py-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <h2 className="text-4xl font-headline font-bold mb-6">{printDesign.title}</h2>
              <p className="text-secondary leading-relaxed mb-8">{printDesign.desc}</p>
              <div className="flex flex-col gap-6 border-t border-primary/10 pt-6">
                <div className="flex flex-wrap gap-2">
                  {(printDesign.tags || []).map((tagObj, i) => {
                    const tagText = typeof tagObj === 'string' ? tagObj : tagObj.tag;
                    return tagText ? (
                      <span key={i} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-primary border border-primary/10 shadow-sm">
                        {tagText}
                      </span>
                    ) : null;
                  })}
                </div>
                <div>
                  <Link to={`/services/${printDesign.slug}`} className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all group">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {(portfolioItems || []).filter(item => item.category === 'print' || item.category === 'newsletter').map((item) => {
                const isNewsletter = item.category === 'newsletter';
                return (
                  <div 
                    key={item.id} 
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-opacity ${
                      isNewsletter ? 'col-span-12 md:col-span-2 aspect-video' : 'col-span-12 md:col-span-1 aspect-[3/4]'
                    }`}
                    onClick={() => setSelectedPortfolioItem(item)}
                  >
                    <HoverMedia item={item} contain={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="px-8 py-24 bg-surface">
        <SpotlightCard spotlightSize={250} className="max-w-5xl mx-auto">
          <h2 className="text-[clamp(1.75rem,4.5vw,3.75rem)] font-headline font-extrabold text-white mb-8 tracking-tighter leading-[1.1]">Ready to Amplify Your Mission?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">Let's architect your next big impact. Our team is ready to turn your vision into a visual catalyst for change.</p>
          <SpotlightButton className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg">
            Start Your Journey
          </SpotlightButton>
        </SpotlightCard>
      </section>

      <PortfolioModal 
        item={selectedPortfolioItem} 
        onClose={() => setSelectedPortfolioItem(null)} 
      />
    </div>
  );
}
