import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PageLayoutComponent } from '@core/components';
import { CardComponent, PageHeaderComponent } from '@shared/components';
import { CommonModule } from '@angular/common';
import {
  MatColumnDef,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { GridColumn } from '@shared/components/custom-table/interfaces';
import { CustomTableModule } from '@shared/components/custom-table/custom-table.module';

// Todo: temp mock data
const ELEMENT_DATA: any[] = [
  { status: 'active', position: 1, weight: 1.0079, symbol: 'H' },
  { status: 'inactive', position: 2, weight: 4.0026, symbol: 'He' },
  { status: 'inactive', position: 3, weight: 6.941, symbol: 'Li' },
  { status: 'inactive', position: 4, weight: 9.0122, symbol: 'Be' },
  { status: 'inactive', position: 5, weight: 10.811, symbol: 'B' },
  { status: 'inactive', position: 6, weight: 12.0107, symbol: 'C' },
  { status: 'inactive', position: 7, weight: 14.0067, symbol: 'N' },
  { status: 'inactive', position: 8, weight: 15.9994, symbol: 'O' },
  { status: 'inactive', position: 9, weight: 18.9984, symbol: 'F' },
  { status: 'inactive', position: 10, weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    CommonModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    CustomTableModule,
    MatTableModule,
    MatSortModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: GridColumn[] = [
    {
      field: 'position',
      header: 'Position',
      width: 20,
      sortable: true,
    },
    {
      field: 'weight',
      header: 'Weight',
      sortable: true,
      align: 'center',
    },
    {
      field: 'symbol',
      header: 'Symbol',
      sortable: true,
      align: 'center',
    },
    {
      field: 'status',
      header: 'Status',
      sortable: false,
      align: 'center',
    },
  ];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  public loading: boolean;

  @ViewChildren(MatColumnDef) columns!: QueryList<MatColumnDef>;

  constructor(private readonly cd: ChangeDetectorRef) {}

  public ngOnInit() {
    setTimeout(() => {
      this.loading = true;
      this.cd.markForCheck();
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngAfterViewInit() {
    // Todo: temp mock data
    // this.dataSource.sort = this.sort;
    // this.cd.markForCheck();
  }
}
