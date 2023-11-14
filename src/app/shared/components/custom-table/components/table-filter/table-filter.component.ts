import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent {
  public iconSearch: IconDefinition = faSearch;
  public searchForm: { search: string } = {
    search: '',
  };

  @Output() public filterValue = new EventEmitter<string>();

  public onSearchSubmit(form: NgForm): void {
    this.filterValue.emit(form.value.search);
  }
}
