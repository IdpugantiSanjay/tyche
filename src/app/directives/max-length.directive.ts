import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[maxLength]'
})
export class MaxLengthDirective {
  @Input('maxLength')
  maxLength: number;

  constructor() {}

  @HostListener('keypress', ['$event'])
  onkeypress(event: KeyboardEvent) {
    const hostValue =
      parseInt((event.target as HTMLElement).innerHTML)
        .toString()
        .trim() || '';

    if (hostValue.length >= this.maxLength) {
      event.preventDefault();
    }
  }
}
