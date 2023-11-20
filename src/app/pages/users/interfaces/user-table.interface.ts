import { Status } from '@shared/components/custom-table/enums';

export interface UserTable {
  status: Status;
  position: number;
  weight: number;
  symbol: string;
}
