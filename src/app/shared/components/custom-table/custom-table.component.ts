import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomTableModule } from './custom-table.module';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  imports: [CustomTableModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent {}
