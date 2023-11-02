import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent {
  @Input() public items: string[] = [];
  @HostBinding('class') private hostClass = 'hidden';
  private skipClick = false;

  @HostListener('click', ['$event'])
  private hostClick(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('window:click')
  private hide(): void {
    if (this.skipClick) {
      this.skipClick = false;
      return;
    }
    this.hostClass = 'hidden';
  }

  public show(): void {
    this.hostClass = '';
    this.skipClick = true;
  }
}
