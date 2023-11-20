import {
  Component,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../services';
import { DialogData } from '../../interfaces';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.scss'],
})
export class ModalHostComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: true, read: ViewContainerRef })
  private content: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  public isLoading$: Observable<boolean>;
  public isDisable$: Observable<boolean>;
  public iconTimes: IconDefinition = faTimes;

  constructor(
    private dialogRef: MatDialogRef<ModalHostComponent>,
    private renderer: Renderer2,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public ngOnInit(): void {
    this.isLoading$ = this.modalService.showBtnLoader$;
    this.isDisable$ = this.modalService._disableBtn$;
    this.createComponent();
    this.addCustomClass();
  }

  public ngOnDestroy(): void {
    this.modalService.showBtnLoader$.next(false);
  }

  public closeModal(payload?: any): void {
    this.dialogRef.close(payload);
    this.modalService.setDisable(false);
  }

  public confirm(): void {
    this.componentRef.instance.onConfirm();
  }

  public async cancelClick(): Promise<void> {
    try {
      if (this.data.hostSettings?.cancelBtnClickAction) {
        await this.data.hostSettings?.cancelBtnClickAction();
      }
    } finally {
      this.closeModal();
    }
  }

  private createComponent(): void {
    const { contentComponent, payload } = this.data;
    this.componentRef = this.content.createComponent(contentComponent);

    this.componentRef.instance.payload = payload;
    this.componentRef.instance.closeModal = this.closeModal.bind(this);
  }

  private addCustomClass(): void {
    const el = (
      (
        (this.componentRef.location.nativeElement as HTMLElement)
          .offsetParent as HTMLDivElement
      ).offsetParent as HTMLDivElement
    ).offsetParent as HTMLDivElement;

    this.renderer.addClass(el, 'cdk-global-overlay-wrapper--scrollable');
  }
}
