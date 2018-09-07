import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBgColor]'
})
export class BgColorDirective {

  @Input('appBgColor') color: string;

  constructor(private element: ElementRef) {}

  ngOnChanges() {
    console.log(this.color)
    this.element.nativeElement.style.backgroundColor = this.color;
  }

  ngOnInit() {
  }

}
