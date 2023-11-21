import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PageLayoutComponent } from '@core/components';
import { CardComponent, PageHeaderComponent } from '@shared/components';
import { GridColumn } from '@shared/components/custom-table/interfaces';
import { clinicGridColumns } from './static-data';
import {
  MatColumnDef,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { ClinicModalPayload, ClinicTable } from './interfaces';
import {
  Status,
  TableActionList,
  TableItemMode,
} from '@shared/components/custom-table/enums';
import { CommonModule } from '@angular/common';
import { CustomTableModule } from '@shared/components/custom-table/custom-table.module';
import { ModalService } from '@shared/components/modal/services';
import { ModalModule } from '@shared/components/modal/modal.module';
import { InfoModalContentType } from '@shared/components/modal/enums';
import { ModalInfoComponent } from '@shared/components/modal/components';
import { InfoModalPayload } from '@shared/components/modal/interfaces';
import { ClinicModalComponent } from './modals';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicService } from './services/clinic.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
  imports: [
    CommonModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    CustomTableModule,
    MatTableModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ClinicService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent implements OnInit {
  @ViewChildren(MatColumnDef) columns!: QueryList<MatColumnDef>;
  public displayedColumns: GridColumn[] = clinicGridColumns;
  public dataSource = new MatTableDataSource<ClinicTable>([]);
  public loading = true;
  public readonly status = Status;

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private clinicService: ClinicService,
    private modalService: ModalService
  ) {}

  public ngOnInit(): void {
    this.initializeData();
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
          return firstValueFrom(this.clinicService.deleteClinic(row.id));
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
            ? this.clinicService.editClinic(row.id, formData)
            : this.clinicService.addClinic(formData);

          return firstValueFrom(operation);
        },
      }
    );
  }
}
