import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { ActionList } from '@core/static-data';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent {
  @Input() public toggleBtnText: string = 'Action';
  @Input() public extendClass: string;

  public actionItems: string[] = ActionList;
  public isMenuOpened: boolean;
  public iconDown: IconDefinition = faAngleDown;
  public iconUp: IconDefinition = faAngleUp;

  public toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  public clickedOutside(): void {
    this.isMenuOpened = false;
  }
}
