import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {



  url = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  public getPostsForEditor(editorId: number): Observable<any> {
    return this.http.get(this.url + 'post/editor/' + editorId);
  }

  public addPostForEditor(postData): Observable<any> {
    return this.http.post(this.url + 'post/add', postData);
  }

  public getTags(): Observable<any> {
    return this.http.get(this.url + 'post/tags');
  }

  public getPostsForUser(userId: number): Observable<any> {
    return this.http.get(this.url + 'post/user/' + userId + '/tags');
  }

  public deletePost(postDetails): Observable<any> {
    console.log(postDetails);
    return this.http.put(this.url + 'post/delete', postDetails);
  }

  public addTags(userId: number, tags: string[]): Observable<any> {
    console.log(userId, tags);
    return this.http.put(this.url + 'user/addTags/' + userId, tags);
  }

  public getUnApprovedEditors(): Observable<any> {
    return this.http.get(this.url + 'admin/editor/notapproved');
  }

  public approveEditor(editorId) {
    return this.http.put(this.url + 'admin/editor/approve', editorId);
  }

  public getApprovedEditors(): Observable<any> {
    return this.http.get(this.url + 'admin/editor/approved');
  }

  public addComment(comment: object): Observable<any> {
    return this.http.post(this.url + 'comment/add', comment);
  }
}
