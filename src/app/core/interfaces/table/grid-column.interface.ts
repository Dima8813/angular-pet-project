export interface GridColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filtered?: boolean;
  width?: number;
  align?: string;
  customField?: boolean;
}
