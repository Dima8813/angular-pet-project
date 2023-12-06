import { MatDialogConfig } from '@angular/material/dialog';

export const dialogConfig: MatDialogConfig = {
  backdropClass: 'modal-window-backdrop',
  closeOnNavigation: true,
  position: { top: '30px' },
  hasBackdrop: false,
  panelClass: 'modal-panel',
  disableClose: true,
};
