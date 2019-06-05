import {NgModule} from '@angular/core';
import {Security} from './security';
import {OAuth} from "./oauth";

@NgModule({
  imports: [],
  providers: [
    Security,
    OAuth
  ],
})
export class SecurityModule {

}
