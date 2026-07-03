import { ContentTypeSchema } from './types';

export const heroSchema: ContentTypeSchema = {
  slug: 'heroes',
  singular: 'hero',
  plural: 'heroes',
  label: 'Hero Section',
  fields: [
    { name: 'name_ar', type: 'text', label: 'Name (Arabic)', required: true },
    { name: 'name_en', type: 'text', label: 'Name (English)', required: true },
    { name: 'title_ar', type: 'text', label: 'Role Title (Arabic)', required: true },
    { name: 'title_en', type: 'text', label: 'Role Title (English)', required: true },
    { name: 'subtitle_ar', type: 'text', label: 'Subtitle/Description (Arabic)', required: true },
    { name: 'subtitle_en', type: 'text', label: 'Subtitle/Description (English)', required: true },
    { name: 'whatsapp_number', type: 'text', label: 'WhatsApp Number (e.g. 966503026795)', required: true },
    { name: 'hide_chatbot', type: 'boolean', label: 'Hide Chatbot on Main Page', required: false },
    { name: 'favicon', type: 'image', label: 'Favicon / Browser Tab Icon (R2)', required: false },
    { name: 'site_title_ar', type: 'text', label: 'Website Tab/Meta Title (Arabic)', required: false },
    { name: 'site_title_en', type: 'text', label: 'Website Tab/Meta Title (English)', required: false },
    { name: 'seo_description_ar', type: 'text', label: 'SEO Meta Description (Arabic)', required: false },
    { name: 'seo_description_en', type: 'text', label: 'SEO Meta Description (English)', required: false },
    { name: 'seo_keywords', type: 'text', label: 'SEO Keywords (comma-separated)', required: false },

    // Dynamic Navigation and Layout Localizations
    { name: 'nav_projects_ar', type: 'text', label: 'Nav Projects (Arabic)', required: false },
    { name: 'nav_projects_en', type: 'text', label: 'Nav Projects (English)', required: false },
    { name: 'nav_certificates_ar', type: 'text', label: 'Nav Certificates (Arabic)', required: false },
    { name: 'nav_certificates_en', type: 'text', label: 'Nav Certificates (English)', required: false },
    { name: 'nav_about_ar', type: 'text', label: 'Nav About (Arabic)', required: false },
    { name: 'nav_about_en', type: 'text', label: 'Nav About (English)', required: false },
    { name: 'nav_contact_ar', type: 'text', label: 'Nav Contact (Arabic)', required: false },
    { name: 'nav_contact_en', type: 'text', label: 'Nav Contact (English)', required: false },

    { name: 'hero_top_label_ar', type: 'text', label: 'Hero Top Eyebrow (Arabic)', required: false },
    { name: 'hero_top_label_en', type: 'text', label: 'Hero Top Eyebrow (English)', required: false },
    { name: 'hero_projects_label_ar', type: 'text', label: 'Hero Projects Stat Subtext (Arabic)', required: false },
    { name: 'hero_projects_label_en', type: 'text', label: 'Hero Projects Stat Subtext (English)', required: false },
    { name: 'hero_experience_label_ar', type: 'text', label: 'Hero Experience Stat Subtext (Arabic)', required: false },
    { name: 'hero_experience_label_en', type: 'text', label: 'Hero Experience Stat Subtext (English)', required: false },
    { name: 'hero_experience_years', type: 'text', label: 'Hero Experience Stat Number (e.g. 3)', required: false },

    { name: 'about_skills_header_ar', type: 'text', label: 'About Skills Section Header (Arabic)', required: false },
    { name: 'about_skills_header_en', type: 'text', label: 'About Skills Section Header (English)', required: false },
    { name: 'about_skills_list', type: 'repeater', label: 'About Skill Tags List', required: false },

    { name: 'projects_header_ar', type: 'text', label: 'Projects Section Header (Arabic)', required: false },
    { name: 'projects_header_en', type: 'text', label: 'Projects Section Header (English)', required: false },
    { name: 'projects_archive_link_ar', type: 'text', label: 'Projects Full Archive Link (Arabic)', required: false },
    { name: 'projects_archive_link_en', type: 'text', label: 'Projects Full Archive Link (English)', required: false },

    { name: 'stack_header_ar', type: 'text', label: 'Stack Section Header (Arabic)', required: false },
    { name: 'stack_header_en', type: 'text', label: 'Stack Section Header (English)', required: false },
    { name: 'stack_tech_label_ar', type: 'text', label: 'Stack Big Number Subtext (Arabic)', required: false },
    { name: 'stack_tech_label_en', type: 'text', label: 'Stack Big Number Subtext (English)', required: false },
    { name: 'stack_tech_count', type: 'text', label: 'Stack Big Number Count (e.g. 8)', required: false },
    { name: 'stack_list_ar', type: 'repeater', label: 'Stack Items Details List (Arabic)', required: false },
    { name: 'stack_list_en', type: 'repeater', label: 'Stack Items Details List (English)', required: false },

    { name: 'contact_header_ar', type: 'text', label: 'Contact Section Big Header (Arabic)', required: false },
    { name: 'contact_header_en', type: 'text', label: 'Contact Section Big Header (English)', required: false },
    { name: 'contact_email', type: 'text', label: 'Contact Email Address', required: false },
    { name: 'contact_linkedin', type: 'text', label: 'Contact LinkedIn Profile URL', required: false },
    { name: 'contact_github', type: 'text', label: 'Contact GitHub Profile URL', required: false },
    { name: 'footer_location_ar', type: 'text', label: 'Footer Location Label (Arabic)', required: false },
    { name: 'footer_location_en', type: 'text', label: 'Footer Location Label (English)', required: false }
  ]
};

export default heroSchema;
