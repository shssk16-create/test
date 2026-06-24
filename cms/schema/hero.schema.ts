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
    { name: 'hide_chatbot', type: 'boolean', label: 'Hide Chatbot on Main Page', required: false }
  ]
};

export default heroSchema;
