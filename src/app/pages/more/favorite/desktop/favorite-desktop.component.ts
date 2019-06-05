import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-favorite-desktop',
  templateUrl: 'favorite-desktop.component.html',
  styleUrls: ['favorite-desktop.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class FavoriteComponentDesktop {

  tab: string = 'hotel';

  constructor() {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tab = 'hotel';
  }
  
  //on select tab
  onSelectTab(type) {
    this.tab = type;
  }
  
}
