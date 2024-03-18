import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ModalComponent } from './components/modal/modal.component';
import { LoginFailModalComponent } from './components/login-fail-modal/login-fail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage, ModalComponent, LoginFailModalComponent]
})
export class LoginPageModule { }
