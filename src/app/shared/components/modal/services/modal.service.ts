import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ModalHostComponent } from '../components';
import { DialogData, ModalHostSettings } from '../interfaces';
import { DefaultModalHostSettings, dialogConfig } from '../static-data';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class ModalService {
  public showBtnLoader$ = new BehaviorSubject<boolean>(false);
  public _disableBtn$ = new BehaviorSubject<boolean>(false);

  constructor(private dialog: MatDialog) {}

  public setDisable(value: boolean): void {
    this._disableBtn$.next(value);
  }

  public getDisable(): boolean {
    return this._disableBtn$.getValue();
  }

  public openModal<T>(
    contentComponent: ComponentType<unknown>,
    modalHostSettings: ModalHostSettings,
    payload?: T
  ): Observable<unknown> {
    const hostSettings: ModalHostSettings = {
      ...DefaultModalHostSettings,
      ...modalHostSettings,
    };
    const data: DialogData<T> = {
      contentComponent,
      hostSettings,
      payload,
    };

    const dialogRef = this.dialog.open(ModalHostComponent, {
      ...dialogConfig,
      width: modalHostSettings?.width || '400px',
      data,
    });

    dialogRef
      .beforeClosed()
      .pipe(take(1))
      .subscribe(() => dialogRef.addPanelClass('modal-panel-slide-out'));

    return dialogRef.afterClosed();
  }

  public closeModal(): void {
    this.dialog.closeAll();
  }
}
