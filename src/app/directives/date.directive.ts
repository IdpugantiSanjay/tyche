import { Directive, HostListener } from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[date]'
})
export class DateDirective {
  constructor() {}

  @HostListener('keypress', ['$event'])
  onkeypress(event: KeyboardEvent) {
    const wouldbeValue = (event.target as any).value + event.key;
    const separatorCount = _.countBy(wouldbeValue)['/'] || 0;

    if (separatorCount > 2 || !'1234567890/'.includes(event.key.toString())) {
      event.preventDefault();
    }

    if (event.key === '/' && (event.target as any).value.charAt((event.target as any).value.length - 1) === '/') {
      event.preventDefault();
    }
  }
}
