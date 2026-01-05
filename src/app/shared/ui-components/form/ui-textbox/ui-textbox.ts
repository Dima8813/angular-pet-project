import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalField } from '@angular/forms/signals';
import { LabelComponent } from '@progress/kendo-angular-label';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { UiFormErrors } from '../ui-form-errors/ui-form-errors';

@Component({
  selector: 'ui-textbox',
  imports: [
    LabelComponent,
    TextBoxComponent,
    UiFormErrors,
  ],
  standalone: true,
  templateUrl: './ui-textbox.html',
  styleUrl: './ui-textbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTextbox implements FormValueControl<any> {
  // Base Inputs
  labelText = input<string>('Label text...');
  readonly value = model<string>('');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);

  // Validation
  readonly invalid = input<boolean>(false);
  readonly dirty = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly touched = input<boolean>(false);   // Todo: Check
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
}
