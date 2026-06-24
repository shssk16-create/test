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
    { name: 'seo_keywords', type: 'text', label: 'SEO Keywords (comma-separated)', required: false }
  ]
};

export default heroSchema;
