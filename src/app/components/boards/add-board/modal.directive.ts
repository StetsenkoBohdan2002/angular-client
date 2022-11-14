import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[clickOutsideModal]',
})
export class ClickedOutsideDirectiveModal {
  @Output() clickOutsideModal: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @HostListener('document:click', ['$event'])
  onClick(event: PointerEvent) {
    if (event && event.target) {
      const element:HTMLElement = event.target as HTMLElement;
      if (element.classList.contains('modal')) {
        if (element.classList.contains('add-board__wrapper')) {
          let res = confirm(
            'Are you sure you want to leave? The data you entered will be reset.'
          );
          if (res) {
            this.clickOutsideModal.emit(false);
          }
        } else {
          this.clickOutsideModal.emit(false);
        }
      }
    }
  }

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}
}
