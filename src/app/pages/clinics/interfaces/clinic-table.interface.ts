import { Status } from '@core/enums';

export interface ClinicTable {
  id: number;
  code: string;
  name: string;
  address: string;
  status: Status;
}
