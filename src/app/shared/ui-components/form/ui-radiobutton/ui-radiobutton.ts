import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
  ViewChild
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { WithOptionalField } from '@angular/forms/signals';
import { InputSize, RadioButtonComponent, RadioButtonDirective } from '@progress/kendo-angular-inputs';
import { LabelComponent } from '@progress/kendo-angular-label';
import { UiFormErrors } from '../ui-form-errors/ui-form-errors';

@Component({
  selector: 'ui-radiobutton',
  imports: [
    RadioButtonDirective,
    LabelComponent,
    UiFormErrors
  ],
  standalone: true,
  templateUrl: './ui-radiobutton.html',
  styleUrl: './ui-radiobutton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiRadiobutton implements  AfterViewInit, FormValueControl<any>{
  @ViewChild(RadioButtonComponent) private radio!: RadioButtonComponent;

  // Base Inputs
  labelText = input<string>('Label text...');
  readonly value = model<any>('');
  option = input<string>('');
  size = input<InputSize>('medium');

  // Validations
  readonly invalid = input<boolean>(false);
  readonly dirty = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);

  // Anchor for kendo-label
  radioRef = signal<RadioButtonComponent | null>(null);

  ngAfterViewInit(): void {
    this.radioRef.set(this.radio);
  }
}
