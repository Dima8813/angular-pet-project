import { Component, signal } from '@angular/core';
import { apply, Field, form, minLength, required, schema, Schema } from '@angular/forms/signals';
import { UiTextbox } from '@shared/ui-components';

interface User {
  firstName: string;
  lastName: string;
}

const initialUser: User = {
  firstName: '',
  lastName: ''
};

const firstNameSchema: Schema<string> = schema((patch) => {
  required(patch, {message: 'This field is required'})
  minLength(patch, 3, {message: 'This field is too short!'})
})

const lastNameSchema: Schema<string> = schema((patch) => {
  required(patch, {message: 'This field is required'})
  minLength(patch, 3, {message: 'This field is too short!'})
})

@Component({
  selector: 'app-sign-in',
  imports: [
    Field,
    UiTextbox,
  ],
  standalone: true,
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  protected readonly user =  signal<User>(initialUser);

  signInForm = form<User>(this.user, (path) => {
    apply(path.firstName, firstNameSchema);
    apply(path.lastName, lastNameSchema);
  })

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }
}
