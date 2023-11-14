import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  MatColumnDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GridColumn } from './interfaces';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent implements AfterViewInit {
  @Input() displayedColumns: GridColumn[] = [];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() columnAdd: QueryList<MatColumnDef>;
  @Input() tableFilter: boolean;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatTable) public table: MatTable<any>;
  @ContentChildren(MatColumnDef) public columnDefs: QueryList<MatColumnDef>;

  public displayedColumnsFiltered: string[] = [];
  public globalFilter = '';

  constructor(private readonly cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.displayedColumns = this.displayedColumns.filter(
      (column: GridColumn) =>
        !this.columnDefs.some(
          (columnDef: MatColumnDef) => column.field === columnDef.name
        )
    );
    this.displayedColumnsFiltered = this.displayedColumns.map(
      (column: GridColumn) => column.field
    );

    setTimeout(() => {
      this.columnAdd.forEach((x: MatColumnDef) => {
        this.table.addColumnDef(x);
        this.displayedColumnsFiltered.push(x.name);
      });
      this.cd.markForCheck();
    });
  }

  public applyFilter(filter: string): void {
    // Todo: temp code for filter inside the column
    // const filteredValues: {[key: string]: string} = {};
    // this.displayedColumnsFiltered.forEach((property: string) => {
    //   filteredValues[property] = '';
    // });
    //this.dataSource.filter = JSON.stringify(filteredValues);

    this.globalFilter = filter;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  private customFilterPredicate(): (a: any, b: string) => boolean {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let globalMatch = !this.globalFilter;

      if (this.globalFilter && this.listColumnsFiltering.length) {
        globalMatch = this.listColumnsFiltering.some(
          (key: string) =>
            data[key]
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(this.globalFilter.toLowerCase().toLowerCase()) !== -1
        );
      }

      if (!globalMatch && this.listColumnsFiltering.length) {
        return false;
      }

      // Todo: temp code for filter inside the column
      return true;
      // let searchString = JSON.parse(filter);
      // return (
      //   data.position.toString().trim().indexOf(searchString.position) !== -1 &&
      //   data.position
      //     .toString()
      //     .trim()
      //     .toLowerCase()
      //     .indexOf(searchString.position.toLowerCase()) !== -1
      // );
    };
    return myFilterPredicate;
  }

  private get listColumnsFiltering(): string[] {
    return this.displayedColumns
      .filter((column: GridColumn) => column.filtered)
      .map(column => column.field);
  }
}
