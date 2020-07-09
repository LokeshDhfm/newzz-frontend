import { Router } from '@angular/router';
import { HttpApiService } from './../services/http-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataPropagateService } from 'src/app/core/services/data/data-propagate.service';
import { AlertService } from '../../profile/services/alert.service';
@Component( {
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [ './user-login.component.scss' ]
} )
export class UserLoginComponent implements OnInit {
  loginForm;
  constructor(  private fb: FormBuilder, private httpService: HttpApiService,
                private router: Router, private dataService: DataPropagateService,
                private alert: AlertService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group( {
      email: new FormControl( '', [ Validators.email, Validators.minLength( 6 ), Validators.required ] ),
      password: new FormControl( '', [ Validators.minLength( 6 ), Validators.required ] )
    } );
  }

  login( loginData ) {
    this.httpService.userLogin( loginData ).subscribe( retrievedData => {
      this.alert.getSnackBar().dismiss();
      console.log(retrievedData);
      this.saveCurrentUser(retrievedData);
      this.dataService.$isUser = true;
      this.dataService.$isEditor = false;
      // this.dataService.isLoggedIn.next((true));
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
    }, error => {
      this.alert.getSnackBar().dismiss();
      this.alert.displaySnackBar(error.error.error.message);
      console.error( error.error.error.message );
    } );
  }

  get f() {
    return this.loginForm.controls;
  }

  goSignup() {
    this.loginForm.setValidators( null );
    this.router.navigate( [ '/signup/user' ] );
  }

  saveCurrentUser(data) {
    const user = data.response;
    user.isEditor = false;
    user.isAdmin = false;
    localStorage.setItem('user', JSON.stringify(user));

  }
}
