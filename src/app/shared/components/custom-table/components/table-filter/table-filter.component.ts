import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownMenuComponent } from '../../../dropdown-menu';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    DropdownMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent {
  public iconSearch: IconDefinition = faSearch;
  public searchForm: { search: string } = {
    search: '',
  };

  @Input() confirmBtnText: string;
  @Output() public filterValue = new EventEmitter<string>();
  @Output() public addNewRow = new EventEmitter<unknown>();

  public onSearchSubmit(form: NgForm): void {
    this.filterValue.emit(form.value.search);
  }
}
