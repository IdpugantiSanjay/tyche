import { Directive, HostListener, ElementRef, Renderer2, Input, Output, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appRecordEvents]'
})
export class RecordEventsDirective implements AfterViewInit {
  elementToDoOperationsOn: any;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.elementToDoOperationsOn = this.element.nativeElement.querySelector('#recordActions');
  }

  @HostListener('mouseover')
  public onRecordMouseOver() {
    this.renderer.removeClass(this.elementToDoOperationsOn, 'hide');
    this.renderer.addClass(this.elementToDoOperationsOn, 'show');
  }

  @HostListener('mouseout')
  public onRecordMouseLeave() {
    this.renderer.removeClass(this.elementToDoOperationsOn, 'show');
    this.renderer.addClass(this.elementToDoOperationsOn, 'hide');
  }
}
