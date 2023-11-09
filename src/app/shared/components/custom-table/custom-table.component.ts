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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ContentChildren(MatColumnDef)
  public columnDefs: QueryList<MatColumnDef>;

  public displayedColumnsFiltered: string[] = [];

  constructor(private readonly cd: ChangeDetectorRef) {}

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
}
