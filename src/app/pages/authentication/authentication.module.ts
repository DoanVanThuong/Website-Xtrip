import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {
  MatInputModule,
} from '@angular/material';

import {CommonModule as AppCommonModule} from '../../common/common.module';
import {ComponentsModule as AppComponentModule} from '../../components/components.module';

import {routing} from './authentication.routing';

import {ResetPasswordComponent} from './reset/reset.component';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationIndexComponent} from './index/index.component';
import {ForgotPasswordComponent} from './forgot/forgot.component';

@NgModule({
  imports: [
    routing,
    AppCommonModule,
    AppComponentModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
  ],
  providers: [],
  declarations: [
    AuthenticationComponent,
    AuthenticationIndexComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],

})
export class AuthenticationModule {
}
