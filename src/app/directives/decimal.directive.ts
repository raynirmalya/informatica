import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective {

  @Input() allowedChars: string;
  @Input() totalLength: number;
  @Input() fractionDigits: number;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    let initalValue = this.el.nativeElement.value;
    const regex = new RegExp(
      `[^0-9${this.allowedChars ? this.allowedChars : ''}]*`,
      'g'
    );
    initalValue = initalValue.replace(regex, '');
    if( initalValue.indexOf(".") > -1) {
      const num = initalValue.split(".");
      initalValue = num[0]+"."+num[1].substring(0, this.fractionDigits);
      initalValue = initalValue.substring(0, this.totalLength - 2);
    } else {
      initalValue = initalValue.substring(0, this.totalLength);
    }
    this.el.nativeElement.value = initalValue;
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
