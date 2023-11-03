import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() public appClickOutside = new EventEmitter<void>();

  private documentClickSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event: Event) => !this.isInside(event.target as HTMLElement))
      )
      .subscribe(() => this.appClickOutside.emit());
  }

  public ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }

  private isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }
}
