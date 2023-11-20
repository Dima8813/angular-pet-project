import { GridColumn } from '@shared/components/custom-table/interfaces';
import { UserTable } from '../interfaces';
import { Status } from '@shared/components/custom-table/enums';

export const userGridColumns: GridColumn[] = [
  {
    field: 'position',
    header: 'Position',
    width: 20,
    sortable: true,
  },
  {
    field: 'weight',
    header: 'Weight',
    align: 'center',
    sortable: true,
  },
  {
    field: 'symbol',
    header: 'Symbol',
    align: 'center',
    sortable: true,
    filtered: true,
  },
  {
    field: 'status',
    header: 'Status',
    align: 'center',
    sortable: false,
  },
];

export const userGridData: UserTable[] = [
  { status: Status.Active, position: 1, weight: 1.0079, symbol: 'H' },
  { status: Status.Inactive, position: 2, weight: 4.0026, symbol: 'He' },
  { status: Status.Inactive, position: 3, weight: 6.941, symbol: 'Li' },
  { status: Status.Inactive, position: 4, weight: 9.0122, symbol: 'Be' },
  { status: Status.Inactive, position: 5, weight: 10.811, symbol: 'B' },
  { status: Status.Inactive, position: 6, weight: 12.0107, symbol: 'C' },
  { status: Status.Inactive, position: 7, weight: 14.0067, symbol: 'N' },
  { status: Status.Inactive, position: 8, weight: 15.9994, symbol: 'O' },
  { status: Status.Inactive, position: 9, weight: 18.9984, symbol: 'F' },
  { status: Status.Inactive, position: 10, weight: 20.1797, symbol: 'Ne' },
];
