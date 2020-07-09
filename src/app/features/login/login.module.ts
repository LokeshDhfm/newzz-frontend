import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpApiService } from './services/http-api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { EditorLoginComponent } from './editor-login/editor-login.component';
import { SharedModule } from 'src/app/common-modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataPropagateService } from 'src/app/core/services/data/data-propagate.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [UserLoginComponent, EditorLoginComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpApiService, DataPropagateService]
})
export class LoginModule { }
