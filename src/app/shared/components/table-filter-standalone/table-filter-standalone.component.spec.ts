import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterStandaloneComponent } from './table-filter-standalone.component';

describe('TableFilterStandaloneComponent', () => {
  let component: TableFilterStandaloneComponent;
  let fixture: ComponentFixture<TableFilterStandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableFilterStandaloneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableFilterStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
