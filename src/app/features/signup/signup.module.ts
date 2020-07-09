import { HttpApiService } from 'src/app/core/services/http/http-api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { EditorSignupComponent } from './editor-signup/editor-signup.component';
import { SharedModule } from 'src/app/common-modules/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginGuard } from 'src/app/core/gaurds/login.guard';


@NgModule({
  declarations: [UserSignupComponent, EditorSignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpApiService, LoginGuard]
})
export class SignupModule { }
