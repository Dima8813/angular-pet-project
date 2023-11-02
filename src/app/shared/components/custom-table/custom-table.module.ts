import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableFilterComponent } from './components';
import { DropdownMenuComponent } from '../dropdown-menu';

@NgModule({
  declarations: [TableComponent, TableFilterComponent, DropdownMenuComponent],
  imports: [CommonModule],
  exports: [TableComponent, TableFilterComponent],
})
export class CustomTableModule {}
