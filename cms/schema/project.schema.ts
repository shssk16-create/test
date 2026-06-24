import { ContentTypeSchema } from './types';

export const projectSchema: ContentTypeSchema = {
  slug: 'projects',
  singular: 'project',
  plural: 'projects',
  label: 'Projects',
  fields: [
    { name: 'category', type: 'repeater', label: 'Categories', required: true },
    { name: 'title_ar', type: 'text', label: 'Title (Arabic)', required: true },
    { name: 'title_en', type: 'text', label: 'Title (English)', required: true },
    { name: 'subtitle_ar', type: 'text', label: 'Subtitle (Arabic)', required: true },
    { name: 'subtitle_en', type: 'text', label: 'Subtitle (English)', required: true },
    { name: 'accentColor', type: 'text', label: 'Accent Color (Hex)', required: true },
    { name: 'thumbIcon', type: 'text', label: 'Thumb Icon (Lucide)', required: true },
    { name: 'problem_ar', type: 'text', label: 'Problem (Arabic)', required: true },
    { name: 'problem_en', type: 'text', label: 'Problem (English)', required: true },
    { name: 'decision_ar', type: 'text', label: 'Decision (Arabic)', required: true },
    { name: 'decision_en', type: 'text', label: 'Decision (English)', required: true },
    { name: 'result_ar', type: 'text', label: 'Result (Arabic)', required: true },
    { name: 'result_en', type: 'text', label: 'Result (English)', required: true },
    { name: 'stack', type: 'repeater', label: 'Tech Stack', required: true },
    { name: 'year', type: 'text', label: 'Year', required: true },
    { name: 'featured', type: 'boolean', label: 'Featured Project', required: false },
    { name: 'logo', type: 'image', label: 'Client Logo (R2)', required: false },
    { name: 'image', type: 'image', label: 'Project Screenshot (R2)', required: false },
    { name: 'link', type: 'text', label: 'Live Link', required: false }
  ]
};

export default projectSchema;
