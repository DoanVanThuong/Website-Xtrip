import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, Injectable, EmbeddedViewRef} from '@angular/core';

@Injectable()
export class DomService {

  constructor(protected componentFactoryResolver: ComponentFactoryResolver, protected applicationRef: ApplicationRef, protected injector: Injector) {
  }

  appendComponentToBody(component: any) {
    //create a components reference
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

    // attach components to the appRef so that so that it will be dirty checked.
    this.applicationRef.attachView(componentRef.hostView);

    // get DOM element from components
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    return componentRef;
  }

  removeComponentFromBody(componentRef: ComponentRef<any>) {
    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
