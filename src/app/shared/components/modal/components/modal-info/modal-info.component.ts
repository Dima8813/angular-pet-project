import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from '../../services';
import { InfoModalPayload, ModalChild } from '../../interfaces';
import { InfoModalContentType } from '../../enums';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ModalInfoComponent implements ModalChild {
  @Input()
  public payload: InfoModalPayload;

  @Input()
  public closeModal: (payload?: any) => void;

  public readonly infoModalContentType = InfoModalContentType;

  constructor(private modalService: ModalService) {}

  public async onConfirm(): Promise<void> {
    if (this.payload.isDismissBehaviour) {
      this.closeModal();
      return;
    }

    try {
      this.modalService.showBtnLoader$.next(true);
      await this.payload.action();
      this.closeModal(this.payload?.afterClosePayload);
    } finally {
      this.modalService.showBtnLoader$.next(false);
    }
  }
}
