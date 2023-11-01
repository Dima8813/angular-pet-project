import {
  ComponentRef,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
  NgForm,
  NgModel,
} from '@angular/forms';
import {
  EMPTY,
  fromEvent,
  iif,
  merge,
  skip,
  startWith,
  Subscription,
} from 'rxjs';
import { ErrorStateMatcherService, InputErrorComponent } from '../input-error';

/* eslint-disable  @angular-eslint/directive-selector */
@Directive({
  selector: `
    [ngModel]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),
    [ngModelGroup]:not([withoutValidationErrors])
  `,
  standalone: true,
})
export class DynamicValidatorMessageDirective implements OnInit, OnDestroy {
  public ngControl =
    inject(NgControl, { self: true, optional: true }) ||
    inject(ControlContainer, { self: true });
  public elementRef = inject(ElementRef);

  get form() {
    return this.parentContainer?.formDirective as
      | NgForm
      | FormGroupDirective
      | null;
  }

  @Input() public errorStateMatcher = inject(ErrorStateMatcherService);

  private vcr = inject(ViewContainerRef);
  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  private errorMessageTrigger!: Subscription;
  private parentContainer = inject(ControlContainer, { optional: true });

  public ngOnInit(): void {
    queueMicrotask(() => {
      if (!this.ngControl.control)
        throw Error(`No control model for ${this.ngControl.name} control...`);

      this.errorMessageTrigger = merge(
        this.ngControl.control.statusChanges,
        fromEvent(this.elementRef.nativeElement, 'blur'),
        iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
      )
        .pipe(
          startWith(this.ngControl.control.status),
          skip(this.ngControl instanceof NgModel ? 1 : 0)
        )
        .subscribe(() => {
          if (
            this.errorStateMatcher.isErrorVisible(
              this.ngControl.control,
              this.form
            )
          ) {
            if (!this.componentRef) {
              this.componentRef = this.vcr.createComponent(InputErrorComponent);
              this.componentRef.changeDetectorRef.markForCheck();
            }
            this.componentRef.setInput('errors', this.ngControl.errors);
          } else {
            this.componentRef?.destroy();
            this.componentRef = null;
          }
        });
    });
  }

  public ngOnDestroy(): void {
    this.errorMessageTrigger.unsubscribe();
  }
}
