import { GridColumn } from '@shared/components/custom-table/interfaces';
import { Status } from '@shared/components/custom-table/enums';

export const clinicGridColumns: GridColumn[] = [
  {
    field: 'code',
    header: 'Clinic code',
  },
  {
    field: 'name',
    header: 'Clinic name',
    align: 'center',
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
  },
];
