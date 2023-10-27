import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';

import { AuthService } from '@shared/services';
import { User } from '@core/interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy {
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    name: [''],
    surname: [''],
    bio: [''],
    password: ['', [Validators.required, Validators.minLength(4)]],
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
      .registration(formValue)
      .pipe(
        tap(() => this.router.navigate(['login'])),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }
}
