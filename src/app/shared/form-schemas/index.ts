import { email, minLength, required, schema, Schema } from '@angular/forms/signals';

// Todo: Add the errors message to the dictionary
export const firstNameSchema: Schema<string> = schema((patch) => {
  required(patch, {message: 'This field is required'})
  minLength(patch, 3, {message: 'This field is too short!'})
})

export const lastNameSchema: Schema<string> = schema((patch) => {
  required(patch, {message: 'This field is required'})
  minLength(patch, 3, {message: 'This field is too short!'})
})

export const emailSchema: Schema<string> = schema((patch) => {
  required(patch, {message: 'This field is required'})
  email(patch, {message: 'The field is not valid'})
})
