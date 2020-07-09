import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private url = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(this.url + 'post');
  }

  getTags(): Observable<any> {
    return this.http.get(this.url + 'post/tags');
  }

  getFilteredPosts( filterTag: any[] ): Observable<any> {
    console.log(filterTag);

    return this.http.post(this.url + 'post/filter', filterTag);
  }

  addComment(comment: object): Observable<any> {
    return this.http.post(this.url + 'comment/add', comment);
  }

}
