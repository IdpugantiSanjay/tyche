import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Renderer2,
  Renderer,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { IRecord } from '../models/record';

@Directive({
  selector: '[appRecordColor]'
})
export class RecordColorDirective implements AfterViewInit {
  ngAfterViewInit(): void {
    this.setColor();
  }

  @Input('record') record: IRecord;

  constructor(private element: ElementRef, private renderer: Renderer) {}

  private setColor() {
    var color =
      this.record.type === 2
        ? this.record.value > 100
          ? 'red'
          : this.record.value > 70
          ? 'orange'
          : 'green'
        : 'black';

    this.renderer.setElementStyle(this.element.nativeElement, 'backgroundColor', color);
  }
}
