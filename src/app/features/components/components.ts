import { Component } from '@angular/core';
import { UiButton } from '@shared/ui-components';

@Component({
  selector: 'app-components',
  imports: [
    UiButton
  ],
  standalone: true,
  templateUrl: './components.html',
  styleUrl: './components.scss',
})
export class Components {

}
