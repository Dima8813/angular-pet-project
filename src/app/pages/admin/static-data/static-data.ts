import { GridColumn } from '@core/interfaces';

export const adminGridColumns: GridColumn[] = [
  {
    field: 'position',
    header: 'Position',
    width: 40,
    align: 'center',
    sortable: true,
  },
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    customField: true,
  },
  {
    field: 'weight',
    header: 'Weight',
    sortable: false,
  },
  {
    field: 'symbol',
    header: 'Symbol',
    sortable: true,
  },
  {
    field: 'actions',
    header: 'Actions',
    customField: true,
  },
];
