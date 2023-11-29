import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { bufferCount, filter, Subject, takeUntil, tap } from 'rxjs';

import { AuthService } from '@shared/services';
import { InputErrorComponent } from '@shared/components';
import { UniqueNicknameValidator } from '@core/validations/async-validators';
import { User } from '@core/interfaces';
import { AppRouteEnum } from '@core/enums';
import { CustomValidator } from '@core/validations/custom-validators/custom.validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputErrorComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: [
      '',
      {
        validators: [Validators.required, CustomValidator.banWords(['test'])],
        asyncValidators: [
          this.uniqueNickname.validate.bind(this.uniqueNickname),
        ],
        updateOn: 'blur',
      },
    ],
    name: [''],
    surname: [''],
    bio: [''],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  public readonly appRouteEnum = AppRouteEnum;

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private uniqueNickname: UniqueNicknameValidator,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.form.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prevState]) => prevState === 'PENDING'),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => this.cd.markForCheck());
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  public onSubmit(): void {
    const formValue = this.form.value as User;
    this.authService
      .registration(formValue)
      .pipe(
        tap(() => this.router.navigate([AppRouteEnum.Login])),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
}
