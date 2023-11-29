import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '@core/components';
import { PageHeaderComponent } from '@shared/components/page-header';
import { CardComponent } from '@shared/components/card';
import { MatColumnDef, MatTableDataSource } from '@angular/material/table';
import { GridColumn } from '@shared/components/custom-table/interfaces';
import { Status, TableActionList } from '@shared/components/custom-table/enums';
import { CustomTableComponent } from '@shared/components/custom-table';
import { DropdownMenuComponent } from '@shared/components/dropdown-menu';
import { ClinicService } from '../clinics/services/clinic.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { clinicGridColumns } from '../clinics/static-data';
import { ClinicTable } from '../clinics/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { userGridColumns, userGridData } from '../users/static-data';
import { UserTable } from '../users/interfaces';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    ReactiveFormsModule,

    DropdownMenuComponent,
    CustomTableComponent
  ],
  providers: [ClinicService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
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
