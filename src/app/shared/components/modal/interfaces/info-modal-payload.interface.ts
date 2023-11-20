import { InfoModalContentType } from '../enums';

export interface InfoModalPayload {
  type: InfoModalContentType;
  action?: () => any;
  text?: string | number;
  list?: Array<string | number>;
  isDismissBehaviour?: boolean;
  afterClosePayload?: any;
}
