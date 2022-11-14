import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickedOutsideDirective {
  @Output() clickOutside: EventEmitter<boolean> = new EventEmitter<boolean>();
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    console.log(event.target)
    console.log(this.elemRef.nativeElement.contains(event.target))
    if (!this.elemRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(false);
    }
  }

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}
}
