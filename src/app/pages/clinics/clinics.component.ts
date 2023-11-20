import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PageLayoutComponent } from '@core/components';
import { CardComponent, PageHeaderComponent } from '@shared/components';
import { GridColumn } from '@shared/components/custom-table/interfaces';
import { clinicGridColumns, clinicGridData } from './static-data';
import {
  MatColumnDef,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { ClinicTable } from './interfaces';
import { Status, TableActionList } from '@shared/components/custom-table/enums';
import { CommonModule } from '@angular/common';
import { CustomTableModule } from '@shared/components/custom-table/custom-table.module';
import { ModalService } from '@shared/components/modal/services';
import { ModalModule } from '@shared/components/modal/modal.module';
import { InfoModalContentType } from '@shared/components/modal/enums';
import { ModalInfoComponent } from '@shared/components/modal/components';
import { InfoModalPayload } from '@shared/components/modal/interfaces';

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
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent implements OnInit {
  @ViewChildren(MatColumnDef) columns!: QueryList<MatColumnDef>;
  public displayedColumns: GridColumn[] = clinicGridColumns;
  public dataSource = new MatTableDataSource<ClinicTable>(clinicGridData);
  public loading: boolean;

  public readonly status = Status;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private modalService: ModalService
  ) {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
      this.cd.markForCheck();
    });
  }

  public handleTableAction(action: string, row: ClinicTable): void {
    if (action === TableActionList.Add) {
      this.addClinic();
    }

    if (action === TableActionList.Delete) {
      this.deleteClinic(row);
    }
  }

  private addClinic(): void {
    throw new Error('Method "addClinic" not implemented.');
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
          throw new Error('Method "deleteClinic" not implemented.');
        },
      }
    );
  }
}
