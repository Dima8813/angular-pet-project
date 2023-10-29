import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '@core/components';
import { PageHeaderComponent } from '@shared/components';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
  imports: [PageLayoutComponent, PageHeaderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent {}
