import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatColumnDef,
  MatHeaderRowDef,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { GridColumn } from '@core/interfaces';
import { TableBarComponent } from './components';

@Component({
  selector: 'app-custom-table-standalone',
  templateUrl: './custom-table-standalone.component.html',
  styleUrls: ['./custom-table-standalone.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, TableBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableStandaloneComponent<T>
  implements OnInit, AfterContentInit
{
  @ContentChildren(MatHeaderRowDef)
  public headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef) public rowDefs: QueryList<MatRowDef<T>>;
  @ViewChild(MatTable, { static: true }) public table: MatTable<T>;
  @ContentChildren(MatColumnDef) public columnDefs: QueryList<MatColumnDef>;

  @Input() public columns: GridColumn[];
  @Input() public dataSource: MatTableDataSource<T>;
  @Input() public showTableBar: any = false;

  public notCustomColumns: GridColumn[] = [];

  public globalFilter = '';
  public filteredValues: { [key: string]: string } = {};

  public ngOnInit(): void {
    this.notCustomColumns = this.columns.filter(
      (item: GridColumn) => !item.customField
    );

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  public ngAfterContentInit(): void {
    this.columnDefs.forEach((columnDef: MatColumnDef) =>
      this.table.addColumnDef(columnDef)
    );
    this.rowDefs.forEach((rowDef: MatRowDef<T>) =>
      this.table.addRowDef(rowDef)
    );
    this.headerRowDefs.forEach((headerRowDef: MatHeaderRowDef) =>
      this.table.addHeaderRowDef(headerRowDef)
    );
  }

  public applyFilter(filter: string): void {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  private customFilterPredicate(): (a: any, b: any) => boolean {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let globalMatch = !this.globalFilter;

      if (this.globalFilter && this.columnsToFilter.length) {
        globalMatch = this.columnsToFilter.some(
          (key: string) =>
            data[key]
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(this.globalFilter.toLowerCase()) !== -1
        );
      }

      if (!globalMatch && this.columnsToFilter.length) {
        return false;
      }

      let searchString = JSON.parse(filter);
      return this.isMatch(data, searchString);
    };
    return myFilterPredicate;
  }

  private isMatch(data: any, searchString: { [key: string]: string }) {
    for (const key in searchString) {
      const searchData = data[key];
      if (
        searchData &&
        searchData
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString[key].toLowerCase()) === -1
      ) {
        return false;
      }
    }

    return true;
  }

  private get columnsToFilter(): string[] {
    return this.columns
      .filter((column: GridColumn) => column.filtered)
      .map((column: GridColumn) => column.field as keyof typeof column);
  }
}
