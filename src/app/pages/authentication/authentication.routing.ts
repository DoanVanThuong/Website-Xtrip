import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ResetPasswordComponent} from './reset/reset.component';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationIndexComponent} from './index/index.component';
import {ForgotPasswordComponent} from './forgot/forgot.component';
import {AuthLoggedIn} from '../../auth.loggedIn';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    resolve: {
      auth: AuthLoggedIn
    },
    children: [
      {
        path: '',
        component: AuthenticationIndexComponent,
        data: {
          title: 'Đăng nhập'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Đăng nhập'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Đăng ký tài khoản'
        }
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
        data: {
          title: 'Quên mật khẩu',
          meta: ''
        }
      },
      {
        path: 'reset/:token',
        component: ResetPasswordComponent,
        data: {
          title: 'Cài đặt lại mật khẩu',
          meta: ''
        }
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);