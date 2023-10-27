import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '@shared/services';
import { User } from '@core/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  public form = this.fb.group({
    email: ['Dima', [Validators.required, Validators.email]],
    password: ['Kudriavtsev', [Validators.required, Validators.minLength(4)]],
  });

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  public onSubmit(): void {
    const formValue = this.form.value as User;

    this.authService
      .login(formValue)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['users']);
      });
    this.form.reset();
  }
}
