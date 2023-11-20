import { ComponentType } from '@angular/cdk/portal';
import { ModalHostSettings } from './modal-host-settings.interface';

export interface DialogData<T = any> {
  contentComponent: ComponentType<any>;
  hostSettings: ModalHostSettings;
  payload: T;
}
