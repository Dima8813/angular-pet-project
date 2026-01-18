import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { apply, Field, form } from '@angular/forms/signals';
import { UiButton, UiTextbox } from '@shared/ui-components';
import { RouterLink } from '@angular/router';
import { emailSchema, firstNameSchema, lastNameSchema } from '@shared/form-schemas';

interface SignUpForm {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const initialSignUp: SignUpForm = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

@Component({
  selector: 'app-sign-up',
  imports: [
    UiTextbox,
    Field,
    RouterLink,
    UiButton
  ],
  standalone: true,
  templateUrl: './sign-up.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUp {
  protected readonly userCreate =  signal<SignUpForm>(initialSignUp);

  signUpForm = form<SignUpForm>(this.userCreate, (path) => {
    apply(path.firstName, firstNameSchema);
    apply(path.lastName, lastNameSchema);
  })

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
}
