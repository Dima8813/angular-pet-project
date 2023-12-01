import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';

import { PageLayoutComponent } from '@core/components';
import { GridColumn } from '@core/interfaces';
import {
  CardComponent,
  DropdownMenuComponent,
  PageHeaderComponent,
} from '@shared/components';
import { CustomTableComponent } from '@shared/components/custom-table/custom-table.component';

import { userGridColumns } from './static-data';
import { UserTable } from './interfaces';
import { UserService } from './services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    CommonModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    CustomTableComponent,
    DropdownMenuComponent,
    forwardRef(() => CustomTableComponent),
    MatSortModule,
    MatTableModule,
  ],
  providers: [UserService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sort') public sort: MatSort;
  public gridColumns: GridColumn[] = userGridColumns;
  public displayedColumns: string[] = userGridColumns.map(
    (item: GridColumn) => item.field
  );
  public dataSource = new MatTableDataSource<UserTable>([]);

  public loading = true;
  private destroyed$: Subject<void> = new Subject();

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.initializeData();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  private initializeData(): void {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((users: UserTable[]) => {
        this.dataSource.data = users;
        this.loading = false;
      });
  }
}
