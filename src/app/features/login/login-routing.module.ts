import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { EditorLoginComponent } from './editor-login/editor-login.component';
import { LoginGuard } from 'src/app/core/gaurds/login.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserLoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'editor',
    component: EditorLoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    component: AdminLoginComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
