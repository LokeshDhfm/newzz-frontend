import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpApiService {
  url = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  userLogin(loginData) {
    return this.http.post(this.url + 'user/login', loginData);
  }

  editorLogin(loginData) {
    return this.http.post(this.url + 'editor/login', loginData);
  }

  adminLogin(loginData) {
    return this.http.post(this.url + 'admin/login', loginData);
  }
}
