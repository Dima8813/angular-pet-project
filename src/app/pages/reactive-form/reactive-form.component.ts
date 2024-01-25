import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';

import { PageLayoutComponent } from '@core/components';
import {
  CardComponent,
  InputErrorComponent,
  PageHeaderComponent,
} from '@shared/components';
import { CustomValidator } from '@core/validations/custom-validators/custom.validators';
import { SkillsService } from './services';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    CommonModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    ReactiveFormsModule,
    InputErrorComponent,
    FontAwesomeModule,
  ],
  providers: [SkillsService],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormComponent {
  public readonly phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  public iconMinus: IconDefinition = faMinus;
  public iconPlus: IconDefinition = faPlus;

  public skills$: Observable<string[]> = this.skillsService
    .getSkills()
    .pipe(tap((skills: string[]) => this.buildSkillControls(skills)));

  public form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    nickName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    yearOfBirth: this.fb.nonNullable.control(this.years[this.years.length - 1]),
    passport: ['', [Validators.required, CustomValidator.passportValidation()]],
    address: this.fb.nonNullable.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: [0, Validators.required],
    }),
    phones: this.fb.array([
      this.fb.group({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: '',
      }),
    ]),
    skills: this.fb.record<FormControl<boolean>>({}),
  });

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillsService
  ) {}

  public get years(): number[] {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  public get phonesArray(): FormArray {
    return this.form.controls.phones as FormArray;
  }

  public addPhone() {
    this.phonesArray.insert(
      0,
      new FormGroup({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: this.fb.control(''),
      })
    );
  }

  public removePhone(index: number): void {
    this.phonesArray.removeAt(index);
  }

  private buildSkillControls(skills: string[]): void {
    skills.forEach((skill: string) => {
      this.form.controls.skills.addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      );
    });
  }

  public onSubmit(): void {
    const valueForm = this.form.value;
    this.form.reset();
  }
}
