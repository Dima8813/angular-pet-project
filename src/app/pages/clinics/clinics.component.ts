import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom, Subject, takeUntil, tap } from 'rxjs';

import { PageLayoutComponent } from '@core/components';
import { GridColumn } from '@core/interfaces';
import { Status, TableActionList, TableItemMode } from '@core/enums';
import {
  CardComponent,
  CustomTableComponent,
  DropdownMenuComponent,
  PageHeaderComponent,
} from '@shared/components';
import { ModalService } from '@shared/components/modal/services';
import { ClinicModalPayload, ClinicTable } from './interfaces';
import { ClinicModalComponent } from './modals';
import { ClinicService } from './services/clinic.service';
import { clinicGridColumns } from './static-data';
import { ModalInfoComponent } from '@shared/components/modal/components';
import { InfoModalPayload } from '@shared/components/modal/interfaces';
import { InfoModalContentType } from '@shared/components/modal/enums';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
  imports: [
    CommonModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    CustomTableComponent,
    forwardRef(() => CustomTableComponent),
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    ClinicModalComponent,
    DropdownMenuComponent,
  ],
  providers: [ClinicService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sort') public sort: MatSort;

  public gridColumns: GridColumn[] = clinicGridColumns;
  public displayedColumns: string[] = clinicGridColumns.map(
    (item: GridColumn) => item.field
  );
  public dataSource = new MatTableDataSource<ClinicTable>([]);
  public loading = true;
  public readonly status = Status;

  private destroyed$: Subject<void> = new Subject();

  public searchForm: { search: string } = {
    search: '',
  };

  constructor(
    private clinicService: ClinicService,
    private modalService: ModalService
  ) {}

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

  public handleTableAction(action: string, row: ClinicTable): void {
    if (action === TableActionList.Edit) {
      this.handleClinic(row);
    }

    if (action === TableActionList.Delete) {
      this.deleteClinic(row);
    }
  }

  private initializeData(): void {
    this.loading = true;
    this.clinicService
      .getClinics()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((clinics: ClinicTable[]) => {
        this.dataSource.data = clinics;
        this.loading = false;
      });
  }

  private deleteClinic(row: ClinicTable): void {
    this.modalService.openModal<InfoModalPayload>(
      ModalInfoComponent,
      {
        title: 'Delete clinic',
        confirmBtnText: 'Delete',
        showCancelBtn: true,
        showHeader: true,
      },
      {
        type: InfoModalContentType.TEXT,
        text: `Are you sure you want to delete the clinic?`,
        action: () => {
          return firstValueFrom(
            this.clinicService.deleteClinic(row.id).pipe(
              tap(() => {
                this.dataSource.data = this.dataSource.data.filter(
                  (rowTable: ClinicTable) => rowTable.id !== row.id
                );
              })
            )
          );
        },
      }
    );
  }

  public handleClinic(row: ClinicTable = null): void {
    const modalTitle = row ? 'Edit new clinic' : 'Add new clinic';
    const confirmButtonText = row ? 'Edit' : 'Add';

    this.modalService.openModal<ClinicModalPayload<Omit<ClinicTable, 'id'>>>(
      ClinicModalComponent,
      {
        title: modalTitle,
        confirmBtnText: confirmButtonText,
        showCancelBtn: true,
        showHeader: true,
        width: '600px',
      },
      {
        mode: row ? TableItemMode.Edit : TableItemMode.Create,
        row,
        action: (formData: Omit<ClinicTable, 'id'>) => {
          const operation = row
            ? this.editClinic(row.id, formData)
            : this.createClinic(formData);

          return firstValueFrom(operation);
        },
      }
    );
  }

  private editClinic(id: number, formData: Omit<ClinicTable, 'id'>) {
    return this.clinicService.editClinic(id, formData).pipe(
      tap(() => {
        this.dataSource.data = this.dataSource.data.map(
          (clinicRow: ClinicTable) => {
            if (clinicRow.id !== id) {
              return clinicRow;
            }

            return { ...clinicRow, ...formData };
          }
        );
      })
    );
  }

  private createClinic(formData: Omit<ClinicTable, 'id'>) {
    return this.clinicService.addClinic(formData).pipe(
      tap((data: ClinicTable) => {
        this.dataSource.data = [...this.dataSource.data, data];
      })
    );
  }
}
