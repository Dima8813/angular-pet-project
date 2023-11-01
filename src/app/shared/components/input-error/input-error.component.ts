import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { ErrorMessagePipe } from './error-message.pipe';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  imports: [CommonModule, ErrorMessagePipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorComponent {
  @Input() errors: unknown = null;

  public trackByFn(index: number, item: KeyValue<string, any>): string {
    return item.key;
  }
}
