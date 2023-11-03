import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableFilterComponent } from './components';
import { DropdownMenuComponent } from '../dropdown-menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideDirective } from '../../directives';

@NgModule({
  declarations: [
    TableComponent,
    TableFilterComponent,
    DropdownMenuComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [TableComponent, TableFilterComponent],
})
export class CustomTableModule {}
