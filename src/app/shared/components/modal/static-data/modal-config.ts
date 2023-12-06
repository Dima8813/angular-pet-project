import { MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';

export const dialogConfig: MatDialogConfig = {
  backdropClass: 'modal-window-backdrop',
  closeOnNavigation: true,
  position: { top: '30px' },
  hasBackdrop: false,
  panelClass: 'modal-panel',
  disableClose: true,
};
