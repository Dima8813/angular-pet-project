import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Status } from '@core/enums';
import { ModalService } from '@shared/components/modal/services';
import { InputErrorComponent } from '@shared/components';
import { ClinicModalPayload } from '../../interfaces';

@Component({
  selector: 'app-clinic-modal',
  templateUrl: './clinic-modal.component.html',
  styleUrls: ['./clinic-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicModalComponent implements OnInit {
  @Input()
  public payload: ClinicModalPayload<any>;
  @Input()
  public closeModal: () => void;

  public clinicForm = this.fb.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    address: ['', [Validators.required]],
    status: [false],
  });

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    if (!!this.payload.row) {
      const { id, ...row } = this.payload.row;
      const updateValue = {
        ...row,
        status: row.status === Status.Active,
      };
      this.clinicForm.setValue(updateValue);
    }
  }

  public async onConfirm(): Promise<void> {
    if (this.clinicForm.invalid) {
      return;
    }

    try {
      this.modalService.showBtnLoader$.next(true);
      const formValue = {
        ...this.clinicForm.value,
        status: this.clinicForm.value.status ? Status.Active : Status.Inactive,
      };
      await this.payload.action(formValue);
      this.closeModal();
    } finally {
      this.modalService.showBtnLoader$.next(false);
    }
  }
}
