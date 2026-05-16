import { createDirectus, rest } from '@directus/sdk';

const DIRECTUS_URL = 'https://cms.sbasucloud.pp.ua/';

export interface HomePage {
  hero_title: string;
  hero_title_highlight?: string;
  hero_subtitle: string;
  hero_video_url: string;
  hero_image?: string | { id: string };
  trusted_by?: { name: string; logo?: string | { id: string } }[];
  trusted_partners?: { name: string; logo?: string | { id: string } }[];
  testimonials?: any[];
  about_title?: string;
  about_headline?: string;
  about_description?: string;
  about_stat_1_number?: string;
  about_stat_1_label?: string;
  about_stat_2_number?: string;
  about_stat_2_label?: string;
  about_image?: string | { id: string };
  gallery_title?: string;
  gallery_subtitle?: string;
  hero_stat_number?: string;
  hero_stat_label?: string;
}

export interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: { feature: string }[];
}

export interface ServiceGalleryItem {
  id: number;
  title: string;
  subtitle: string;
  image: string | { id: string };
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  home_icon: string;
  home_image: string | { id: string };
  tags: { tag: string }[];
  hero_subtitle: string;
  hero_image: string | { id: string };
  stat_number: string;
  stat_label: string;
  cards_section_title: string;
  cards_section_subtitle: string;
  cards: ServiceCard[];
  gallery_label: string;
  gallery_section_title: string;
  gallery_section_subtitle: string;
  cta_title?: string;
  cta_subtitle?: string;
  cta_button_text?: string;
}

export interface GlobalSettings {
  site_title: string;
  logo: string | { id: string };
  favicon: string | { id: string };
  whatsapp_number?: string;
  whatsapp_message?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_phone_2?: string;
  contact_address?: string;
  map_embed_url?: string;
}

export interface ContactMessage {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  service_of_interest?: string;
  message: string;
  date_created?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  youtube_id?: string;
  video_file?: string | { id: string };
  image: string | { id: string };
  category: 'reel' | 'long_video' | 'print' | 'report' | 'training' | 'image_post' | 'videography';
  is_featured_on_home: boolean;
  is_featured_on_service_page?: boolean;
  is_featured_on_portfolio_page?: boolean;
  sort?: number;
  sub_images?: {
    image?: string | { id: string };
    video_file?: string | { id: string };
    youtube_id?: string;
    title?: string;
    description?: string;
  }[];
}

interface Schema {
  home_page: HomePage;
  services: Service[];
  global_settings: GlobalSettings;
  contact_messages: ContactMessage[];
  portfolio_items: PortfolioItem[];
}

export const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

export const getAssetUrl = (id: string | { id: string } | undefined | null, optimize: boolean = true) => {
  if (!id) return undefined;
  const assetId = typeof id === 'string' ? id : id.id;
  
  // If it's a video or we explicitly don't want optimization, return the raw asset
  if (!optimize) {
    return `${DIRECTUS_URL}assets/${assetId}`;
  }
  
  // Use Directus built-in image transformations to serve optimized WebP images
  return `${DIRECTUS_URL}assets/${assetId}?format=webp&quality=80`;
};

