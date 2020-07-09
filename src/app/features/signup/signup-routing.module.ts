import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorSignupComponent } from './editor-signup/editor-signup.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { LoginGuard } from 'src/app/core/gaurds/login.guard';


const routes: Routes = [
  {
    path: 'editor',
    component: EditorSignupComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'user',
    component: UserSignupComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
