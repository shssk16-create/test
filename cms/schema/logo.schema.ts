import { ContentTypeSchema } from './types';

export const logoSchema: ContentTypeSchema = {
  slug: 'logos',
  singular: 'logo',
  plural: 'logos',
  label: 'Client Logos',
  fields: [
    { name: 'name', type: 'text', label: 'Client/Partner Name', required: true },
    { name: 'imageUrl', type: 'image', label: 'Logo Image (R2)', required: true },
    { name: 'sort_order', type: 'text', label: 'Sort Order', required: false }
  ]
};

export default logoSchema;
