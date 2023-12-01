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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';

import { PageLayoutComponent } from '@core/components';
import {
  CardComponent,
  DropdownMenuComponent,
  PageHeaderComponent,
} from '@shared/components';
import { CustomTableComponent } from '@shared/components/custom-table/custom-table.component';
import { adminGridColumns } from './static-data';
import { AdminServices } from './services/admin.services';
import { AdminTable } from './interfaces';
import { GridColumn } from '@core/interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
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
  providers: [AdminServices],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sort') public sort: MatSort;

  public gridColumns: GridColumn[] = adminGridColumns;
  public displayedColumns: string[] = adminGridColumns.map(
    (item: GridColumn) => item.field
  );
  public dataSource = new MatTableDataSource<AdminTable>([]);
  public loading = true;

  private destroyed$: Subject<void> = new Subject();

  constructor(private adminServices: AdminServices) {}

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
    this.loading = true;
    this.adminServices
      .getAdmins()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((admins: AdminTable[]) => {
        this.dataSource.data = admins;
        this.loading = false;
      });
  }
}
