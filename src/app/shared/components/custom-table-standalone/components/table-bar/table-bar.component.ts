import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-table-bar',
  templateUrl: './table-bar.component.html',
  styleUrls: ['./table-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBarComponent {
  @Output() public searchText = new EventEmitter<string>();

  public iconSearch: IconDefinition = faSearch;
  public searchForm: { search: string } = {
    search: '',
  };

  public onSearchSubmit(form: NgForm): void {
    this.searchText.emit(form.value.search);
  }
}
