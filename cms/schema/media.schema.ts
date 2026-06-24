import { ContentTypeSchema } from './types';

export const mediaSchema: ContentTypeSchema = {
  slug: 'media',
  singular: 'media',
  plural: 'media',
  label: 'Media Library',
  fields: [
    { name: 'key', type: 'text', label: 'File Key', required: true },
    { name: 'name', type: 'text', label: 'File Name', required: true },
    { name: 'size', type: 'text', label: 'File Size', required: true },
    { name: 'mime_type', type: 'text', label: 'Mime Type', required: true },
    { name: 'url', type: 'text', label: 'URL', required: true }
  ]
};

export default mediaSchema;
