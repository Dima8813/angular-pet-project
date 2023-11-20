import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatColumnDef,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { PageLayoutComponent } from '@core/components';
import { CustomTableModule } from '@shared/components/custom-table/custom-table.module';
import { GridColumn } from '@shared/components/custom-table/interfaces';
import { CardComponent, PageHeaderComponent } from '@shared/components';
import { Status } from '@shared/components/custom-table/enums';
import { userGridColumns, userGridData } from './static-data';
import { UserTable } from './interfaces';

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
    ReactiveFormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatColumnDef) columns!: QueryList<MatColumnDef>;

  public displayedColumns: GridColumn[] = userGridColumns;
  public dataSource = new MatTableDataSource<UserTable>(userGridData);
  public loading: boolean;
  public filteredFormControls: { [key: string]: FormControl } = {
    status: new FormControl(),
    position: new FormControl(),
  };

  public readonly status = Status;

  constructor(private readonly cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
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
