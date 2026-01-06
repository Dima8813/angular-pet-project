import { AfterViewInit, ChangeDetectionStrategy, Component, input, model, signal, ViewChild } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';
import { CheckBoxComponent, CheckBoxState, CheckBoxRounded } from '@progress/kendo-angular-inputs';
import { LabelComponent } from '@progress/kendo-angular-label';
import { UiFormErrors } from '../ui-form-errors/ui-form-errors';

@Component({
  selector: 'ui-check-box',
  standalone: true,
  imports: [
    CheckBoxComponent,
    LabelComponent,
    UiFormErrors,
  ],
  templateUrl: './ui-check-box.html',
  styleUrl: './ui-check-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCheckBox implements AfterViewInit, FormValueControl<CheckBoxState> {
  @ViewChild(CheckBoxComponent) private checkbox!: CheckBoxComponent;

  // Base Inputs
  labelText = input<string>('Label text...');
  readonly value = model<CheckBoxState>(false);
  disabled = input<boolean>(false);
  rounded = input<CheckBoxRounded>('medium');

  // Validation
  readonly invalid = input<boolean>(false);
  readonly dirty = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  // Anchor for kendo-label
  checkboxRef = signal<CheckBoxComponent | null>(null);

  ngAfterViewInit() {
    this.checkboxRef.set(this.checkbox);
  }
}
