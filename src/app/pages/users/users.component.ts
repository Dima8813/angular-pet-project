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
import { MatColumnDef, MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { PageLayoutComponent } from '@core/components';
import { GridColumn } from '@shared/components/custom-table/interfaces';
import { Status } from '@shared/components/custom-table/enums';
import { userGridColumns, userGridData } from './static-data';
import { UserTable } from './interfaces';
import { DropdownMenuComponent } from '@shared/components/dropdown-menu';
import { CustomTableComponent } from '@shared/components/custom-table';
import { PageHeaderComponent } from '@shared/components/page-header';
import { CardComponent } from '@shared/components/card';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    RouterModule,
    CommonModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    ReactiveFormsModule,

    DropdownMenuComponent,
    CustomTableComponent,
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
