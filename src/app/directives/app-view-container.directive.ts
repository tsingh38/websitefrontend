import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAppViewContainer]'
})
export class AppViewContainerDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
