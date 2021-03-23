import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GoogleSigninDirective } from './helpers/google-signin.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailLoginComponent } from './components/email-login/email-login.component';
import {KanbanModule} from '../kanban/kanban.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [LoginPageComponent, GoogleSigninDirective, EmailLoginComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    KanbanModule
  ]
})
export class UserModule { }
