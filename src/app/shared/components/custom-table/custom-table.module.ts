import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CustomTableComponent } from './custom-table.component';
import { TableFilterComponent } from './components';
import { DropdownMenuComponent } from '../dropdown-menu';
import { ClickOutsideDirective } from '../../directives';

@NgModule({
  declarations: [
    CustomTableComponent,
    TableFilterComponent,
    DropdownMenuComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, FontAwesomeModule, MatTableModule, MatSortModule],
  exports: [
    CommonModule,
    CustomTableComponent,
    TableFilterComponent,
    DropdownMenuComponent,
  ],
})
export class CustomTableModule {}
