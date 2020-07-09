import { AlertService } from './../services/alert.service';
import { HttpApiService } from './../services/http-api.service';
import { Component, OnInit } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  posts: [];
  user;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  comment = new FormControl('');
  commentValue: any;
  constructor(private httpService: HttpApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getPosts();
    this.comment.valueChanges.subscribe(value => {
      this.commentValue = value;
    });
  }
  getPosts() {
    this.httpService.getPostsForUser(this.user.id).subscribe(data => {
      this.posts = data.response;
      console.log('', data);
      console.log(this.user);
    }, error => {
      this.alert.getSnackBar().dismiss();
      this.alert.displaySnackBar(error.error.error.message);
      console.log(error.error);
    });
  }

  addTag(event) {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push( value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
      event.input.reset();
    }
  }
  removeTag(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addTags() {
    this.httpService.addTags(this.user.id, this.tags).subscribe( user => {
      this.alert.getSnackBar().dismiss();
      this.user = user.response;
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log(user);
      this.getPosts();
    }, error => {
      this.alert.getSnackBar().dismiss();
      this.alert.displaySnackBar(error.error.error.message);
      console.log(error);
    });
  }
  addComment(post, cmnt: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    let usId;
    if (user.isEditor !== false) {
      usId = null;
    } else {
      usId = user.id;
    }
    this.httpService.addComment({postId: post.id, comment: cmnt, editorId: post.editor.id, userId: usId }).subscribe(data => {
      this.alert.getSnackBar().dismiss();
      console.log(data);
      this.getPosts();
      this.comment.reset();
    }, error => {
      this.alert.getSnackBar().dismiss();
      this.alert.displaySnackBar(error.error.error.message);
      console.log(error);
    });
  }
}
