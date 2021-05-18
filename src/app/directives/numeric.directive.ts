import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumeric]'
})
export class NumericDirective {
  @Input() allowedChars: string;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    const regex = new RegExp(
      `[^0-9${this.allowedChars ? this.allowedChars : ''}]*`,
      'g'
    );
    this.el.nativeElement.value = initalValue.replace(regex, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
