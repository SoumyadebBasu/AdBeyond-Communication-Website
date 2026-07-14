Collection: global_settings
Status: ✅
Fields:
  - site_title: string | ✅ | 
  - logo: uuid | ✅ | 
  - favicon: uuid | ✅ | 
  - whatsapp_number: string | ✅ | 
  - whatsapp_message: text | ✅ | 
  - contact_email: string | ✅ | 
  - contact_phone: string | ✅ | 
  - contact_phone_2: string | ✅ | 
  - contact_address: text | ✅ | 
  - map_embed_url: text | ✅ | 
Relationships:

Collection: home_page
Status: ✅
Fields:
  - hero_title: string | ✅ | 
  - hero_title_highlight: string | ✅ | 
  - hero_subtitle: text | ✅ | 
  - hero_video_url: string | ✅ | 
  - testimonial_quote: text | ✅ | 
  - testimonial_highlight: string | ✅ | 
  - testimonial_author: string | ✅ | 
  - testimonial_role: string | ✅ | 
  - testimonial_image: uuid | ✅ | 
Relationships:
  - trusted_by → Unknown | 🔴 | Missing relationship
  - reels_gallery → Unknown | 🔴 | Missing relationship
  - reports_gallery → Unknown | 🔴 | Missing relationship
  - workshops_gallery → Unknown | 🔴 | Missing relationship
  - print_gallery → Unknown | 🔴 | Missing relationship

Collection: services
Status: ✅
Fields:
  - id: integer | ✅ | 
  - title: string | ✅ | 
  - slug: string | ✅ | 
  - short_description: text | ✅ | 
  - home_icon: string | ✅ | 
  - hero_subtitle: text | ✅ | 
  - stat_number: string | ✅ | 
  - stat_label: string | ✅ | 
  - cards_section_title: string | ✅ | 
  - cards_section_subtitle: text | ✅ | 
  - gallery_label: string | ✅ | 
  - gallery_section_title: string | ✅ | 
  - gallery_section_subtitle: text | ✅ | 
  - cta_title: string | ✅ | 
  - cta_subtitle: text | ✅ | 
  - cta_button_text: string | ✅ | 
  - tags: json | ✅ | 
Relationships:
  - cards → services | ✅ | 
  - home_image → directus_files | ✅ | 
  - hero_image → directus_files | ✅ | 

Collection: service_cards
Status: ✅
Fields:
  - id: integer | ✅ | 
  - title: string | ✅ | 
  - description: text | ✅ | 
  - icon: string | ✅ | 
  - features: json | ✅ | 
Relationships:

Collection: portfolio_items
Status: ✅
Fields:
  - id: uuid | ✅ | 
  - title: string | ✅ | 
  - description: text | ✅ | 
  - youtube_id: string | ✅ | 
  - category: string | ✅ | 
  - is_featured_on_home: boolean | ✅ | 
  - is_featured_on_service_page: boolean | ✅ | 
  - is_featured_on_portfolio_page: boolean | ✅ | 
  - sort: integer | ✅ | 
Relationships:
  - video_file → directus_files | ✅ | 
  - image → directus_files | ✅ | 
  - sub_images → portfolio_items | ✅ | 

Collection: contact_messages
Status: ✅
Fields:
  - id: integer | ✅ | 
  - full_name: string | ✅ | 
  - email: string | ✅ | 
  - phone: string | ✅ | 
  - organization: string | ✅ | 
  - service_of_interest: string | ✅ | 
  - message: text | ✅ | 
  - date_created: timestamp | ✅ | 
Relationships:

4b. Flagged Extra Collections (in Directus but not in code)
Collection: navigation
Reason flagged: No usage found in codebase
Recommendation: Review before dropping — confirm it's not used externally
Action: Archive

Collection: navigation_items
Reason flagged: No usage found in codebase
Recommendation: Review before dropping — confirm it's not used externally
Action: Archive

Collection: pages
Reason flagged: No usage found in codebase
Recommendation: Review before dropping — confirm it's not used externally
Action: Archive

Collection: portfolio_sub_images
Reason flagged: No usage found in codebase
Recommendation: Review before dropping — confirm it's not used externally
Action: Archive

Collection: posts
Reason flagged: No usage found in codebase
Recommendation: Review before dropping — confirm it's not used externally
Action: Archive

