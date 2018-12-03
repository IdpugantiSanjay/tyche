import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[numeric]'
})
export class NumericDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  onkeypress(event: KeyboardEvent) {
    if (!'1234567890'.includes(event.key.toString())) {
      event.preventDefault();
    }
  }
}
