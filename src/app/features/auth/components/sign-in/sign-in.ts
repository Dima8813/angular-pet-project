import { Component, signal } from '@angular/core';
import { apply,  Field, form } from '@angular/forms/signals';
import { UiButton, UiCheckBox, UiTextbox } from '@shared/ui-components';
import { RouterLink } from '@angular/router';
import { required } from '@angular/forms/signals';
import { firstNameSchema, passwordSchema } from '@shared/form-schemas';
import { CheckBoxState } from '@progress/kendo-angular-inputs';

interface SignInForm {
  userName: string;
  password: string;
  remember: CheckBoxState;
}

const initialSignIn: SignInForm = {
  userName: '',
  password: '',
  remember: false,
};

@Component({
  selector: 'app-sign-in',
  imports: [
    UiTextbox,
    Field,
    UiButton,
    RouterLink,
    UiCheckBox,

  ],
  standalone: true,
  templateUrl: './sign-in.html',
})
export class SignIn {
  protected readonly user =  signal<SignInForm>(initialSignIn);

  signInForm = form<SignInForm>(this.user, (path) => {
    apply(path.userName, firstNameSchema);
    apply(path.password, passwordSchema);
    required(path.remember, {message: 'This field is required'})
  })

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }
}
