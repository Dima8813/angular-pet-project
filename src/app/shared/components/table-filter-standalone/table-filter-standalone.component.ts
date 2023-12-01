import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, NgForm } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-filter-standalone',
  templateUrl: './table-filter-standalone.component.html',
  styleUrls: ['./table-filter-standalone.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterStandaloneComponent {
  @Output() public searchText = new EventEmitter<string>();

  public iconSearch: IconDefinition = faSearch;
  public searchForm: { search: string } = {
    search: '',
  };

  public onSearchSubmit(form: NgForm): void {
    this.searchText.emit(form.value.search);
  }
}
