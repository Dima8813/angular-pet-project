import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '@core/components';
import { PageHeaderComponent } from '@shared/components';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [PageLayoutComponent, PageHeaderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}
