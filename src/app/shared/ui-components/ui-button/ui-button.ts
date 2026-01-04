import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  ButtonComponent,
  ButtonFillMode,
  ButtonRounded,
  ButtonSize,
  ButtonThemeColor
} from '@progress/kendo-angular-buttons';
import { SVGIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'ui-button',
  imports: [
    ButtonComponent,
  ],
  standalone: true,
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButton {
  id = input<string>('');
  tabIndex = input<number>(0);
  type = input<string>('submit');
  disabled = input<boolean>(false);
  svgIcon = input<SVGIcon>();
  imgUrl = input<string>('')

  size = input<ButtonSize>('medium');
  themeColor = input<ButtonThemeColor>('primary');
  fillMode = input<ButtonFillMode>('solid');
  rounded = input<ButtonRounded>('medium');
}
