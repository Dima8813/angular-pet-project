import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@shared/components';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [CardComponent, RouterModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
