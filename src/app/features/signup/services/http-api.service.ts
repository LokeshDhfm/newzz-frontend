import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private url = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  public editorSignup(signupData): Observable<any> {
    return this.http.post(this.url + 'editor/signup', signupData);
  }

  public userSignup(signupData): Observable<any> {
    return this.http.post(this.url + 'user/signup', signupData);
  }
}
