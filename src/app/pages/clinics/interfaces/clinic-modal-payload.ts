import { ClinicTable } from './clinic-table.interface';
import { TableItemMode } from '@core/enums';

export interface ClinicModalPayload<T> {
  mode: TableItemMode;
  row?: ClinicTable;
  action: (form: T) => Promise<any>;
}
