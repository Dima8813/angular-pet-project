import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLinks } from '../../static-data';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  imports: [SidebarComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  public readonly routerLinks = RouterLinks;

  constructor(private authService: AuthService) {}

  public logout(): void {
    this.authService.signOut();
  }
}
