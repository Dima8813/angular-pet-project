import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  MatColumnDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

import { GridColumn } from './interfaces';
import { TableFilterComponent } from './components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSortModule, MatTableModule, TableFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent<T>
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() displayedColumns: GridColumn[] = [];
  @Input() dataSource: MatTableDataSource<T>;
  @Input() columnAdd: QueryList<MatColumnDef>;
  @Input() tableFilter: boolean;
  @Input() filteredFormControls!: { [key: string]: FormControl };

  @Input() confirmBtnText: string;

  @Output() public addNewRow = new EventEmitter<unknown>();

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatTable) public table: MatTable<any>;
  @ContentChildren(MatColumnDef) public columnDefs: QueryList<MatColumnDef>;

  public globalFilter = '';
  public displayedColumnsFiltered: string[] = [];
  public filteredValues: { [key: string]: string } = {};

  private destroyed$: Subject<void> = new Subject();

  constructor(private readonly cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    if (!!this.filteredFormControls) {
      Object.keys(this.filteredFormControls).forEach((property: string) => {
        this.filteredValues[property] = '';
      });

      for (let key in this.filteredValues) {
        this.filteredFormControls[key].valueChanges
          .pipe(takeUntil(this.destroyed$))
          .subscribe((statusFilterValue: string) => {
            this.filteredValues[key] = statusFilterValue;
            this.dataSource.filter = JSON.stringify(this.filteredValues);
          });
      }
    }
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
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
    }, 0);
  }

  public applyFilter(filter: string): void {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  private customFilterPredicate(): (a: any, b: any) => boolean {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let globalMatch = !this.globalFilter;

      if (this.globalFilter && this.listColumnsFiltering.length) {
        globalMatch = this.listColumnsFiltering.some(
          (key: string) =>
            data[key]
              .toString()
              .trim()
              .toLowerCase()
              .indexOf(this.globalFilter.toLowerCase()) !== -1
        );
      }

      if (!globalMatch && this.listColumnsFiltering.length) {
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

  private get listColumnsFiltering(): string[] {
    return this.displayedColumns
      .filter((column: GridColumn) => column.filtered)
      .map((column: GridColumn) => column.field as keyof typeof column);
  }
}
