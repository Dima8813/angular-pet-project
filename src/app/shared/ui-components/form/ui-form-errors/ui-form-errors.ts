import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ErrorComponent } from '@progress/kendo-angular-inputs';
import { ValidationError, WithOptionalField } from '@angular/forms/signals';

@Component({
  selector: 'ui-form-errors',
  imports: [
    ErrorComponent
  ],
  standalone: true,
  templateUrl: './ui-form-errors.html',
  styleUrl: './ui-form-errors.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiFormErrors {
  errors = input<readonly WithOptionalField<ValidationError>[]>([]);
}
