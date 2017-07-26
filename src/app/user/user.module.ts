import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent}
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class UserModule { }
