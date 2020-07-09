import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditorProfileComponent } from './editor-profile/editor-profile.component';
import { SharedModule } from 'src/app/common-modules/shared/shared.module';
import { HttpApiService } from './services/http-api.service';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';


@NgModule({
  declarations: [UserProfileComponent, EditorProfileComponent, AddPostComponent, AdminProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpApiService]
})
export class ProfileModule { }
