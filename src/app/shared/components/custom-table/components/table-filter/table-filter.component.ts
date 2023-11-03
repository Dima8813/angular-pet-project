import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent {
  public iconSearch: IconDefinition = faSearch;
}
