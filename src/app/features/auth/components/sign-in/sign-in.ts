import { Component, signal } from '@angular/core';
import { apply,  Field, form } from '@angular/forms/signals';
import { UiButton, UiCheckBox, UiRadiobutton, UiTextbox } from '@shared/ui-components';
import { RouterLink } from '@angular/router';
import { required } from '@angular/forms/signals';
import { firstNameSchema, lastNameSchema } from '@shared/form-schemas';
import { CheckBoxState } from '@progress/kendo-angular-inputs';
import { JsonPipe } from '@angular/common';

interface SignInForm {
  firstName: string;
  lastName: string;
  confirm: CheckBoxState;
  answer: string;
}

const initialSignIn: SignInForm = {
  firstName: '',
  lastName: '',
  confirm: false,
  answer: 'Decline',
};

@Component({
  selector: 'app-sign-in',
  imports: [
    Field,
    UiTextbox,
    RouterLink,
    UiButton,
    UiCheckBox,
    UiRadiobutton,
    JsonPipe,
  ],
  standalone: true,
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  protected readonly user =  signal<SignInForm>(initialSignIn);

  signInForm = form<SignInForm>(this.user, (path) => {
    apply(path.firstName, firstNameSchema);
    apply(path.lastName, lastNameSchema);
    required(path.confirm, {message: 'This field is required'})
  })

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }
}
