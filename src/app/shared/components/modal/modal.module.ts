import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalHostComponent } from './components';
import { ModalService } from './services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, MatDialogModule, FontAwesomeModule],
  declarations: [ModalHostComponent], //ModalInfoComponent
  providers: [ModalService],
  exports: [], //ModalInfoComponent
})
export class ModalModule {}
