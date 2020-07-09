import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http/http-api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts = [];
  tags = [];
  filterTag = [];
  comment = new FormControl('');
  commentValue: any;
  constructor(private httpService: HttpApiService) { }

  ngOnInit(): void {
    this.getPosts();
    this.getTags();
    this.comment.valueChanges.subscribe(value => {
      this.commentValue = value;
    });
  }
  getTags() {
    this.httpService.getTags().subscribe(retrievedData => {
      this.tags = retrievedData.response;
      console.log(this.tags);
    });
  }
  getPosts() {
    this.httpService.getPosts().subscribe(retrievedData => {
      this.posts = retrievedData.response;
      console.log(this.posts);
    });
  }

  filterTags(tag) {
    this.filterTag.push(tag);
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.httpService.getFilteredPosts(this.filterTag).subscribe(retrievedData => {
      this.posts = retrievedData.response;
      console.log(this.posts);
    }, error => {
      console.log(error);
    });
  }

  removeTag(tag): void {
    const index = this.filterTag.indexOf(tag);
    if (index >= 0) {
      this.filterTag.splice(index, 1);
    }
    this.tags.push(tag);
    if (this.filterTag.length === 0) {
      this.getPosts();
    }
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
