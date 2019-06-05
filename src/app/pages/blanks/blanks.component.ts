import {Component} from '@angular/core';
import {AppPage} from "../../app.base";

@Component({
  selector: '',
  template: `
    <div class="blank">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class Blanks extends AppPage {

  step: number = 0;

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
}
