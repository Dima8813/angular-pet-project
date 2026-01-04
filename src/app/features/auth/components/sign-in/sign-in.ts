import { Component, signal } from '@angular/core';
import { apply, Field, form } from '@angular/forms/signals';
import { UiButton, UiTextbox } from '@shared/ui-components';
import { RouterLink } from '@angular/router';
import { firstNameSchema, lastNameSchema } from '@shared/form-schemas';

interface SignInForm {
  firstName: string;
  lastName: string;
}

const initialSignIn: SignInForm = {
  firstName: '',
  lastName: ''
};


@Component({
  selector: 'app-sign-in',
  imports: [
    Field,
    UiTextbox,
    RouterLink,
    UiButton,
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
  })

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }
}
