# Directus CMS Content Checklist

Here is a complete, organized checklist of all the content and assets you need to prepare for your Directus CMS. 

I have broken this down by the **Collections** you need to set up in Directus, along with the exact fields and the type of content required for each.

---

### 1. Global Settings (Collection Name: `global_settings`)
*This should be set up as a **Singleton** collection. It controls site-wide elements.*

**Images:**
* [ ] **`logo`** (Image File) - Your main brand logo.
* [ ] **`favicon`** (Image File) - The small icon that appears in the browser tab.

**Text & Contact Info:**
* [ ] **`site_title`** (String) - The name of your website (e.g., "AD-BEYOND").
* [ ] **`contact_email`** (String) - Your public contact email.
* [ ] **`contact_phone`** (String) - Your public contact phone number.
* [ ] **`contact_address`** (Text Area) - Your physical address (can be multiple lines).
* [ ] **`whatsapp_number`** (String) - *Optional.* Number for WhatsApp integration.
* [ ] **`whatsapp_message`** (String) - *Optional.* Default pre-filled message for WhatsApp.
* [ ] **`map_embed_url`** (String) - *Optional.* Leave blank to auto-generate from your address, or paste a specific Google Maps embed URL.

---

### 2. Home Page (Collection Name: `home_page`)
*This should be set up as a **Singleton** collection. It controls the main landing page.*

**Hero Section:**
* [ ] **`hero_title`** (String) - Main headline (e.g., "Amplifying Impact").
* [ ] **`hero_title_highlight`** (String) - The part of the headline you want highlighted in a different color.
* [ ] **`hero_subtitle`** (Text) - The paragraph text under the main headline.
* [ ] **`hero_video_url`** (String) - A direct URL to an `.mp4` video file to play in the background.

**Trusted By (Partners/Clients):**
* [ ] **`trusted_by`** (JSON or Repeater) - A list of partner names (e.g., `[{ "name": "UNICEF" }, { "name": "WHO" }]`).

**Testimonial Section:**
* [ ] **`testimonial_quote`** (Text Area) - The main body of the review.
* [ ] **`testimonial_highlight`** (String) - A short, punchy pull-quote from the review.
* [ ] **`testimonial_author`** (String) - Name of the person giving the review.
* [ ] **`testimonial_role`** (String) - Their job title / organization.
* [ ] **`testimonial_image`** (Image File) - A photo of the author.

**Portfolio Galleries (JSON or Repeaters):**
* [ ] **`reels_gallery`** - A list of video projects. Each needs: `title`, `description`, `youtube_id` (optional), `video_file` (optional), and a thumbnail `image`.
* [ ] **`reports_gallery`** - A list of report projects. Each needs: `title` and an `image`.
* [ ] **`workshops_gallery`** - A list of workshop projects. Each needs: `title` and an `image`.
* [ ] **`print_gallery`** - A list of print projects. Each needs: `title` and an `image`.

---

### 3. Services (Collection Name: `services`)
*This should be set up as a standard **Multiple Items** collection. You will create one entry for each service you offer (e.g., "Social Media Strategy", "Annual Reports").*

**For each service, you need:**

**Basic Info (Used on Home Page & Service Page):**
* [ ] **`title`** (String) - Name of the service.
* [ ] **`slug`** (String) - The URL path (e.g., `social-media-strategy`). **Must be lowercase with hyphens.**
* [ ] **`short_description`** (Text) - A 1-2 sentence summary for the homepage card.
* [ ] **`home_icon`** (String) - The name of the icon to use (e.g., `megaphone`, `camera`, `layout`, `video`).
* [ ] **`home_image`** (Image File) - The preview image shown on the homepage card.
* [ ] **`tags`** (JSON or Repeater) - A list of keywords (e.g., `[{ "tag": "Strategy" }, { "tag": "Content" }]`).

**Service Page Details:**
* [ ] **`hero_subtitle`** (Text Area) - The introductory paragraph on the specific service page.
* [ ] **`hero_image`** (Image File) - The large banner image at the top of the service page.
* [ ] **`stat_number`** (String) - A highlight metric (e.g., "500+", "10M").
* [ ] **`stat_label`** (String) - What the metric represents (e.g., "Campaigns Launched").

**Features/Offerings Section:**
* [ ] **`cards_section_title`** (String) - Headline for the features area (e.g., "What We Deliver").
* [ ] **`cards_section_subtitle`** (Text) - Short description for the features area.
* [ ] **`cards`** (JSON or Repeater) - The specific offerings within this service. Each card needs: `title`, `description`, `icon` (string), and `features` (a list of bullet points).

**Service Gallery:**
* [ ] **`gallery_label`** (String) - Small eyebrow text (e.g., "Our Work").
* [ ] **`gallery_section_title`** (String) - Headline for the gallery (e.g., "Recent Campaigns").
* [ ] **`gallery_section_subtitle`** (Text) - Short description for the gallery.
* [ ] **`gallery_items`** (JSON or Repeater) - The portfolio pieces for this specific service. Each needs: `title`, `subtitle`, and an `image`.

---

### 4. Contact Messages (Collection Name: `contact_messages`)
*You do **not** need to prepare content for this, but you MUST ensure this collection exists so the website can save form submissions!*

**Make sure it has these fields (Standard Input / Strings):**
* [ ] `full_name`
* [ ] `email`
* [ ] `phone`
* [ ] `organization`
* [ ] `service_of_interest`
* [ ] `message` (Text Area)

***

**Pro-Tip for Directus Setup:** For fields like `trusted_by`, `tags`, `cards`, and the `galleries`, the easiest way to set them up in Directus without creating complex relational tables is to use the **"JSON"** field type, and set the interface to **"Repeater"** or **"Raw"**.
