export interface EntityMeta {
  name: string;
  label: string;
  field: Field[];
}

export interface Field {
    operations: Operations,
    allowedValues: string[],
    searchable: Searchable;
    name: string;
    label: string;
    dataType: string;
    length: number;
    trust: boolean;
    applyNullValues: boolean;
    filterable: boolean;
    sortable: boolean;
    system: boolean;
    totalDigits?: number;
    fractionDigits?: number;
    lookup?: Links;
}

export interface Links {
  link: Link[];
}
export interface Link {
  href: string;
  rel: string;
}

export interface Allowed {
  allowed: boolean;
}

export interface Operations {
  read: Allowed;
  create: Allowed;
  update: Allowed;
}

export interface Searchable {
  filterable: boolean;
  facet: boolean;
}
