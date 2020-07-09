import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class DataPropagateService {

  private isUser: boolean;
  private isEditor: boolean;
  private isAdmin: boolean;


  public get $isAdmin(): boolean {
    return this.isAdmin;
  }

  public set $isAdmin(value: boolean) {
    this.isAdmin = value;
  }

  public isLoggedIn: Subject<boolean> = new Subject();
  constructor() { }

  public get $isUser(): boolean {
    return this.isUser;
  }

  public set $isUser( value: boolean ) {
    this.isUser = value;
  }

  public get $isEditor(): boolean {
    return this.isEditor;
  }

  public set $isEditor( value: boolean ) {
    this.isEditor = value;
  }

  public get loggedInStatus(): boolean {
      return JSON.parse(localStorage.getItem('isLoggedIn')) == null ? false : true;
  }
}
