export type FieldType =
  | 'text'
  | 'richtext'
  | 'image'
  | 'relation'
  | 'boolean'
  | 'date'
  | 'select'
  | 'repeater'
  | 'block-builder';

export interface BaseField {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  i18n?: boolean;
}

export interface SelectField extends BaseField {
  type: 'select';
  options: string[];
}

export interface RelationField extends BaseField {
  type: 'relation';
  relationTo: string;
}

export interface RepeaterField extends BaseField {
  type: 'repeater';
  fields: Field[];
}

export interface BlockBuilderBlock {
  name: string;
  label: string;
  fields: Field[];
}

export interface BlockBuilderField extends BaseField {
  type: 'block-builder';
  blocks: BlockBuilderBlock[];
}

export type Field =
  | BaseField
  | SelectField
  | RelationField
  | RepeaterField
  | BlockBuilderField;

export interface ContentTypeSchema {
  slug: string;
  singular: string;
  plural: string;
  label: string;
  fields: Field[];
}
