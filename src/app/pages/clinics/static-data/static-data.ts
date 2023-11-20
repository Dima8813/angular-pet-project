import { GridColumn } from '@shared/components/custom-table/interfaces';
import { Status } from '@shared/components/custom-table/enums';
import { ClinicTable } from '../interfaces';

export const clinicGridColumns: GridColumn[] = [
  {
    field: 'code',
    header: 'Clinic code',
  },
  {
    field: 'name',
    header: 'Clinic name',
    align: 'center',
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

export const clinicGridData: ClinicTable[] = [
  {
    id: '1',
    code: 'pdf908712',
    name: 'Test Clinic',
    address: 'Test Address',
    status: Status.Active,
  },
];
