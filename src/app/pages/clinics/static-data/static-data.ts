import { GridColumn } from '@core/interfaces';

export const clinicGridColumns: GridColumn[] = [
  {
    field: 'code',
    header: 'Clinic code',
    filtered: true,
  },
  {
    field: 'name',
    header: 'Clinic name',
    align: 'center',
    filtered: true,
    sortable: true,
  },
  {
    field: 'address',
    header: 'Address',
    align: 'center',
  },
  {
    field: 'status',
    header: 'Status',
    align: 'center',
    customField: true,
  },
  {
    field: 'actions',
    header: 'Actions',
    customField: true,
  },
];
