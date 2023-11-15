import { Status } from '../enums';

export interface UserTable {
  status: Status;
  position: number;
  weight: number;
  symbol: string;
}
