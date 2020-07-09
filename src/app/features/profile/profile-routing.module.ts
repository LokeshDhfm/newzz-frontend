import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditorProfileComponent } from './editor-profile/editor-profile.component';
import { AuthGuard } from 'src/app/core/gaurds/auth.guard';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';


const routes: Routes = [
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor',
    component: EditorProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
