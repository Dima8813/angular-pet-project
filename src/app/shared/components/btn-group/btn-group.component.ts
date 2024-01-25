import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropDownDirective } from '../../directives/dropDown.directive';

@Component({
  selector: 'app-btn-group',
  standalone: true,
  templateUrl: './btn-group.component.html',
  styleUrl: './btn-group.component.scss',
  imports: [CommonModule, FontAwesomeModule, DropDownDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnGroupComponent {
  @Input() public btnName = 'DropDown';
  @Input() public dropDownList: any[] = [];
}
