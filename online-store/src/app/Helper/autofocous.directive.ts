import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autofocous]'
})
export class AutofocousDirective {
  private _autofocus;
  constructor(private el: ElementRef)
  {
  }

  ngOnInit()
  {
      if (this._autofocus || typeof this._autofocus === "undefined")
          this.el.nativeElement.focus();
  }

  @Input() set autofocus(condition: boolean)
  {
      this._autofocus = condition != false;
  }
}
