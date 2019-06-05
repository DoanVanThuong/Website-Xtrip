import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngLet]',
})
export class LetDirective {
  @Input()
  set ngLet(context: any) {
    this.context.$implicit = this.context.ngLet = context;
    this.updateView();
  }

  context: any = {};

  constructor(private vcRef: ViewContainerRef,
              private templateRef: TemplateRef<any>) {
  }

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}