import React from 'react';
import { SpotlightButton } from '../components/SpotlightButton';

export function Checklist() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-8">
      <div className="flex justify-between items-center mb-12 print:hidden">
        <h1 className="text-4xl font-black font-headline tracking-tighter">Directus Setup Checklist</h1>
        <SpotlightButton 
          onClick={() => window.print()}
          className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Save as PDF
        </SpotlightButton>
      </div>

      <div className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-a:text-primary">
        <p className="text-xl text-secondary mb-12">
          Here is a complete, organized checklist of all the content and assets you need to prepare for your Directus CMS. 
          I have broken this down by the <strong>Collections</strong> you need to set up in Directus, along with the exact fields and the type of content required for each.
        </p>

        <div className="space-y-12">
          {/* 1. Global Settings */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-neutral-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-primary border-b border-neutral-100 pb-4">1. Global Settings (Collection Name: <code>global_settings</code>)</h3>
            <p className="text-sm text-secondary mb-6 italic">This should be set up as a <strong>Singleton</strong> collection. It controls site-wide elements.</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-3">Images:</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>logo</code></strong> (Image File) - Your main brand logo.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>favicon</code></strong> (Image File) - The small icon that appears in the browser tab.</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Text & Contact Info:</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>site_title</code></strong> (String) - The name of your website (e.g., "AD-BEYOND").</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>contact_email</code></strong> (String) - Your public contact email.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>contact_phone</code></strong> (String) - Your primary public contact phone number.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>contact_phone_2</code></strong> (String) - <em>Optional.</em> A secondary contact phone number.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>contact_address</code></strong> (Text Area) - Your physical address (can be multiple lines).</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>whatsapp_number</code></strong> (String) - <em>Optional.</em> Number for WhatsApp integration.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>whatsapp_message</code></strong> (String) - <em>Optional.</em> Default pre-filled message for WhatsApp.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>map_embed_url</code></strong> (String) - <em>Optional.</em> Leave blank to auto-generate from your address, or paste a specific Google Maps embed URL.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Home Page */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-neutral-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-primary border-b border-neutral-100 pb-4">2. Home Page (Collection Name: <code>home_page</code>)</h3>
            <p className="text-sm text-secondary mb-6 italic">This should be set up as a <strong>Singleton</strong> collection. It controls the main landing page.</p>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-3">Hero Section:</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>hero_title</code></strong> (String) - Main headline (e.g., "Amplifying Impact").</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>hero_title_highlight</code></strong> (String) - The part of the headline you want highlighted in a different color.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>hero_subtitle</code></strong> (Text) - The paragraph text under the main headline.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>hero_video_url</code></strong> (String) - A direct URL to an <code>.mp4</code> video file to play in the background.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>hero_image</code></strong> (Image) - A fallback image file shown when no video URL is provided.</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Trusted By (Partners/Clients):</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>trusted_by</code></strong> (JSON or Repeater) - A list of partner names (e.g., <code>[{`{"name": "UNICEF"}`}]</code>).</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Testimonial Section:</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>testimonial_quote</code></strong> (Text Area) - The main body of the review.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>testimonial_highlight</code></strong> (String) - A short, punchy pull-quote from the review.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>testimonial_author</code></strong> (String) - Name of the person giving the review.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>testimonial_role</code></strong> (String) - Their job title / organization.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>testimonial_image</code></strong> (Image File) - A photo of the author.</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Portfolio Integration:</h4>
                <p className="text-secondary mb-4">Note: The individual gallery repeaters (reels_gallery, reports_gallery, etc.) have been deprecated. All portfolio items are now managed via the <code>portfolio_items</code> collection globally.</p>
              </div>
            </div>
          </section>

          {/* 3. Services */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-neutral-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-primary border-b border-neutral-100 pb-4">3. Services (Collection Name: <code>services</code>)</h3>
            <p className="text-sm text-secondary mb-6 italic">This should be set up as a standard <strong>Multiple Items</strong> collection. You will create one entry for each service you offer.</p>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-3">Basic Info (Used on Home Page & Service Page):</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>title</code></strong> (String) - Name of the service.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>slug</code></strong> (String) - The URL path (e.g., <code>social-media-strategy</code>). <strong>Must be lowercase with hyphens.</strong></span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>short_description</code></strong> (Text) - A 1-2 sentence summary for the homepage card.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>home_icon</code></strong> (String) - The name of the icon to use (e.g., <code>megaphone</code>, <code>camera</code>, <code>layout</code>, <code>video</code>).</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>home_image</code></strong> (Image File) - The preview image shown on the homepage card.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>tags</code></strong> (JSON or Repeater) - A list of keywords (e.g., <code>[{`{"tag": "Strategy"}`}]</code>).</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Service Page Details:</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>hero_subtitle</code></strong> (Text Area) - The introductory paragraph on the specific service page.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>hero_image</code></strong> (Image File) - The large banner image at the top of the service page.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>stat_number</code></strong> (String) - A highlight metric (e.g., "500+", "10M").</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>stat_label</code></strong> (String) - What the metric represents (e.g., "Campaigns Launched").</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Features/Offerings Section:</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>cards_section_title</code></strong> (String) - Headline for the features area (e.g., "What We Deliver").</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>cards_section_subtitle</code></strong> (Text) - Short description for the features area.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>cards</code></strong> (JSON or Repeater) - The specific offerings within this service. Each card needs: <code>title</code>, <code>description</code>, <code>icon</code> (string), and <code>features</code> (a list of bullet points).</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Service Gallery:</h4>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>gallery_label</code></strong> (String) - Small eyebrow text (e.g., "Our Work").</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>gallery_section_title</code></strong> (String) - Headline for the gallery (e.g., "Recent Campaigns").</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>gallery_section_subtitle</code></strong> (Text) - Short description for the gallery.</span></li>
                  <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>gallery_items</code></strong> (JSON or Repeater) - The portfolio pieces for this specific service. Each needs: <code>title</code>, <code>subtitle</code>, and an <code>image</code>.</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Portfolio Items */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-neutral-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-primary border-b border-neutral-100 pb-4">4. Portfolio Items (Collection Name: <code>portfolio_items</code>)</h3>
            <p className="text-sm text-secondary mb-6 italic">This replaces all the individual gallery repeaters. Create one entry for each piece of work.</p>

            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>title</code></strong> (String)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>description</code></strong> (Text)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>image</code></strong> (Image File) - Required thumbnail/fallback.</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>video_file</code></strong> (File) - <em>Optional.</em> Direct MP4 upload.</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>youtube_id</code></strong> (String) - <em>Optional.</em> Just the ID, not full URL.</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>category</code></strong> (Dropdown/String) - Options: <code>reel</code>, <code>long_video</code>, <code>print</code>, <code>report</code>, <code>training</code>, <code>image_post</code>, <code>videography</code>.</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>is_featured_on_home</code></strong> (Boolean)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>is_featured_on_portfolio_page</code></strong> (Boolean)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>is_featured_on_service_page</code></strong> (Boolean)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>sort</code></strong> (Integer) - For ordering manually.</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><strong><code>sub_images</code></strong> (O2M) - Child collection with identical fields for carousel support.</span></li>
            </ul>
          </section>

          {/* 5. Contact Messages */}
          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-neutral-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-primary border-b border-neutral-100 pb-4">5. Contact Messages (Collection Name: <code>contact_messages</code>)</h3>
            <p className="text-sm text-secondary mb-6 italic">You do <strong>not</strong> need to prepare content for this, but you MUST ensure this collection exists so the website can save form submissions!</p>
            
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><code>full_name</code> (String)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><code>email</code> (String)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><code>phone</code> (String)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><code>organization</code> (String)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><code>service_of_interest</code> (String)</span></li>
              <li className="flex items-start gap-3"><input type="checkbox" className="mt-1.5 w-4 h-4" /> <span><code>message</code> (Text Area)</span></li>
            </ul>
          </section>

          <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl">
            <p className="text-primary font-medium m-0">
              <strong>Pro-Tip for Directus Setup:</strong> For fields like <code>trusted_by</code>, <code>tags</code>, <code>cards</code>, and the <code>galleries</code>, the easiest way to set them up in Directus without creating complex relational tables is to use the <strong>"JSON"</strong> field type, and set the interface to <strong>"Repeater"</strong> or <strong>"Raw"</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
