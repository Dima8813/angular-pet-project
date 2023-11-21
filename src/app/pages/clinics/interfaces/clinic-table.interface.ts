import { Status } from '@shared/components/custom-table/enums';

export interface ClinicTable {
  id: number;
  code: string;
  name: string;
  address: string;
  status: Status;
}
