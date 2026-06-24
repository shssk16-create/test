import { ContentTypeSchema } from './types';

export const certificateSchema: ContentTypeSchema = {
  slug: 'certificates',
  singular: 'certificate',
  plural: 'certificates',
  label: 'Certificates',
  fields: [
    { name: 'name_ar', type: 'text', label: 'Certificate Name (Arabic)', required: true },
    { name: 'name_en', type: 'text', label: 'Certificate Name (English)', required: true },
    { name: 'issuer_ar', type: 'text', label: 'Issuer Organization (Arabic)', required: true },
    { name: 'issuer_en', type: 'text', label: 'Issuer Organization (English)', required: true },
    { name: 'date', type: 'date', label: 'Date Earned', required: true },
    { name: 'credential_url', type: 'text', label: 'Credential URL', required: false },
    { name: 'image', type: 'image', label: 'Certificate Image (R2)', required: false },
    { name: 'featured', type: 'boolean', label: 'Featured/Primary Certificate', required: false },
    { name: 'skills', type: 'repeater', label: 'Skills/Badges', required: false },
    { name: 'description_ar', type: 'text', label: 'Description (Arabic)', required: false },
    { name: 'description_en', type: 'text', label: 'Description (English)', required: false },
    { name: 'degree_level_ar', type: 'text', label: 'Degree/Certificate Level (Arabic)', required: false },
    { name: 'degree_level_en', type: 'text', label: 'Degree/Certificate Level (English)', required: false }
  ]
};

export default certificateSchema;
