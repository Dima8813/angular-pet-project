import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { tableActionList } from '../custom-table/static-data';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent {
  @Input() public toggleBtnText: string = 'Action';
  @Input() public extendClass: string;
  @Input() public actionItems: string[] = tableActionList;
  @Output() public eventTableAction = new EventEmitter<string>();

  public isMenuOpened: boolean;
  public iconDown: IconDefinition = faAngleDown;
  public iconUp: IconDefinition = faAngleUp;

  public toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  public clickedOutside(): void {
    this.isMenuOpened = false;
  }

  public handleActionClick(item: string) {
    if (item) {
      this.eventTableAction.emit(item);
    }
  }
}
