import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpApiService } from '../services/http-api.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-editor-profile',
  templateUrl: './editor-profile.component.html',
  styleUrls: ['./editor-profile.component.scss']
})
export class EditorProfileComponent implements OnInit {

  posts = [];
  user = JSON.parse(localStorage.getItem('user'));
  comment = new FormControl('');
  commentValue: any;
  constructor(private httpService: HttpApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getPosts();
    this.comment.valueChanges.subscribe(value => {
      this.commentValue = value;
    });
  }
  getPosts() {
    this.httpService.getPostsForEditor(this.user.id).subscribe(data => {

      this.posts = data.response;
      console.log('', this.posts, data);
      this.alert.getSnackBar().dismiss();
    }, error => {
      this.alert.displaySnackBar(error.error.error.message);
      console.log(error.error.error.message);
      this.posts = [];
    });
  }

  delete(item) {
    // let data : any = {};
    // data['postId'] = item.id;
    // data['editorId'] = item.editor.id;
    this.httpService.deletePost({postId: item.id, editorId: item.editor.id }).subscribe(success => {
      console.log('success', success);
      this.getPosts();
  }, error => {
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
      console.log(data);
      this.getPosts();
      this.comment.reset();
    }, error => {
      console.log(error);
    });
  }
}
