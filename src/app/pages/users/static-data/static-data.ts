import { GridColumn } from '@core/interfaces';

export const userGridColumns: GridColumn[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    field: 'surname',
    header: 'Surname',
    sortable: true,
  },
  {
    field: 'username',
    header: 'User name',
    sortable: true,
  },
  {
    field: 'email',
    header: 'Email',
    align: 'center',
  },
];
