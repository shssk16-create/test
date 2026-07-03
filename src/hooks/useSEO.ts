import { useEffect, useState } from 'react';

export interface SEOData {
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  favicon?: string;
  site_title_ar?: string;
  site_title_en?: string;
  seo_description_ar?: string;
  seo_description_en?: string;
  seo_keywords?: string;
  whatsapp_number?: string;
  nav_projects_ar?: string;
  nav_projects_en?: string;
  nav_certificates_ar?: string;
  nav_certificates_en?: string;
  nav_about_ar?: string;
  nav_about_en?: string;
  nav_contact_ar?: string;
  nav_contact_en?: string;
  hero_top_label_ar?: string;
  hero_top_label_en?: string;
  hero_projects_label_ar?: string;
  hero_projects_label_en?: string;
  hero_experience_label_ar?: string;
  hero_experience_label_en?: string;
  hero_experience_years?: string;
  about_skills_header_ar?: string;
  about_skills_header_en?: string;
  about_skills_list?: any;
  projects_header_ar?: string;
  projects_header_en?: string;
  projects_archive_link_ar?: string;
  projects_archive_link_en?: string;
  stack_header_ar?: string;
  stack_header_en?: string;
  stack_tech_label_ar?: string;
  stack_tech_label_en?: string;
  stack_tech_count?: string;
  stack_list_ar?: any;
  stack_list_en?: any;
  contact_header_ar?: string;
  contact_header_en?: string;
  contact_email?: string;
  contact_linkedin?: string;
  contact_github?: string;
  footer_location_ar?: string;
  footer_location_en?: string;
}

export function useSEO(owner: 'amal' | 'salmeen', lang: 'ar' | 'en', pageType: 'home' | 'portfolio' | 'certificates') {
  const [seoData, setSeoData] = useState<SEOData | null>(null);

  useEffect(() => {
    async function fetchSEO() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiBase}/api/heroes?owner=${owner}`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            const data = json.data[0] as SEOData;
            setSeoData(data);

            // 1. Update document title
            let baseTitle = lang === 'ar'
              ? (data.site_title_ar || `${data.name_ar} | ${data.title_ar}`)
              : (data.site_title_en || `${data.name_en} | ${data.title_en}`);

            if (pageType === 'portfolio') {
              baseTitle = lang === 'ar' ? `معرض الأعمال | ${baseTitle}` : `Portfolio | ${baseTitle}`;
            } else if (pageType === 'certificates') {
              baseTitle = lang === 'ar' ? `السجل الأكاديمي | ${baseTitle}` : `Academic Record | ${baseTitle}`;
            }
            document.title = baseTitle;

            // 2. Update favicon
            if (data.favicon) {
              const cdnFavicon = data.favicon.startsWith('/') ? `${apiBase}${data.favicon}` : data.favicon;
              let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
              }
              link.href = cdnFavicon;
            }

            // 3. Update description meta tag
            let metaDesc = document.querySelector("meta[name='description']") as HTMLMetaElement;
            if (!metaDesc) {
              metaDesc = document.createElement('meta');
              metaDesc.name = 'description';
              document.head.appendChild(metaDesc);
            }
            metaDesc.content = lang === 'ar'
              ? (data.seo_description_ar || data.subtitle_ar)
              : (data.seo_description_en || data.subtitle_en);

            // 4. Update keywords meta tag
            if (data.seo_keywords) {
              let metaKeywords = document.querySelector("meta[name='keywords']") as HTMLMetaElement;
              if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
              }
              metaKeywords.content = data.seo_keywords;
            }
          }
        }
      } catch (err) {
        console.warn("Failed to fetch SEO metadata", err);
      }
    }

    fetchSEO();
  }, [owner, lang, pageType]);

  return seoData;
}
