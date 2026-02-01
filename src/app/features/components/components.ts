import { Component, signal } from '@angular/core';
import { UiButton, UiCheckBox, UiRadioButton, UiTextbox } from '@shared/ui-components';
import { Field, form, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

interface DemoForm {
  name: string;
  remember: boolean;
  gender: string;
}

const initialDemoForm: DemoForm = {
  name: '',
  remember: false,
  gender: 'female',
};

@Component({
  selector: 'app-components',
  imports: [
    UiButton,
    UiTextbox,
    Field,
    UiCheckBox,
    JsonPipe,
    UiRadioButton
  ],
  standalone: true,
  templateUrl: './components.html',
  styleUrl: './components.scss',
})
export class Components {
  protected readonly demo =  signal<DemoForm>(initialDemoForm);

  demoForm = form<DemoForm>(this.demo, (path) => {
    required(path.name, {message: 'This field is required'});
  })
}
