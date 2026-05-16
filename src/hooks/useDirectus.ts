import { useQuery, useMutation } from '@tanstack/react-query';
import { directus, HomePage, Service, GlobalSettings, PortfolioItem, ContactMessage } from '../lib/directus';
import { readSingleton, readItems, createItem } from '@directus/sdk';

export function useGlobalSettings() {
  return useQuery({
    queryKey: ['global_settings'],
    queryFn: async () => {
      return await directus.request(readSingleton('global_settings')) as any as GlobalSettings;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useHomePage() {
  return useQuery({
    queryKey: ['home_page'],
    queryFn: async () => {
      return await directus.request(readSingleton('home_page', {
        fields: ['*', 'trusted_by.*', 'trusted_partners.*', 'testimonials.*'] as any
      })) as any;
    },
  });
}

export function useServices(isSummary = true) {
  return useQuery({
    queryKey: ['services', isSummary],
    queryFn: async () => {
      const fields = (isSummary 
        ? ['id', 'title', 'slug', 'short_description', 'home_icon', 'home_image', 'tags']
        : ['*', 'cards.*']) as any;
      return await directus.request(readItems('services', { fields })) as any;
    },
  });
}

export function useServiceBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['services', slug],
    queryFn: async () => {
      if (!slug) return null;
      const data = await directus.request(readItems('services', {
        filter: { slug: { _eq: slug } },
        fields: ['*', 'cards.*'] as any
      }));
      return data.length > 0 ? (data[0] as any) : null;
    },
    enabled: !!slug,
  });
}

export function usePortfolioFeaturedHome() {
  return useQuery({
    queryKey: ['portfolio', 'featured_home'],
    queryFn: async () => {
      return await directus.request(readItems('portfolio_items', {
        filter: { is_featured_on_home: { _eq: true } },
        fields: ['id', 'title', 'description', 'youtube_id', 'video_file', 'image', 'category', 'is_featured_on_home', 'sort', 'sub_images.*'] as any,
        sort: ['sort']
      })) as any;
    },
  });
}

export function usePortfolioFeaturedPortfolio() {
  return useQuery({
    queryKey: ['portfolio', 'featured_portfolio'],
    queryFn: async () => {
      return await directus.request(readItems('portfolio_items', {
        filter: { is_featured_on_portfolio_page: { _eq: true } },
        fields: ['id', 'title', 'description', 'youtube_id', 'video_file', 'image', 'category', 'is_featured_on_home', 'sort', 'sub_images.*'] as any,
        sort: ['sort']
      })) as any;
    },
  });
}

export function usePortfolioFeaturedService(categories: string[]) {
  return useQuery({
    queryKey: ['portfolio', 'featured_service', categories],
    queryFn: async () => {
      if (categories.length === 0) return [];
      return await directus.request(readItems('portfolio_items', {
        filter: {
          is_featured_on_service_page: { _eq: true },
          category: { _in: categories as any }
        },
        fields: ['id', 'title', 'description', 'youtube_id', 'video_file', 'image', 'category', 'sub_images.*'] as any
      })) as any;
    },
    enabled: categories.length > 0,
  });
}

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: async (message: ContactMessage) => {
      return await directus.request(createItem('contact_messages', message));
    }
  });
}
