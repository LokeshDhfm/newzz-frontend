import { AlertService } from './../../profile/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataPropagateService } from 'src/app/core/services/data/data-propagate.service';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpApiService,
              public router: Router, private dataService: DataPropagateService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [, Validators.minLength(3), Validators.required]),
      password: new FormControl('', [Validators.minLength(3), Validators.required])
    });
  }

  login(loginData) {
    this.httpService.adminLogin(loginData).subscribe(retrievedData => {
      this.alert.getSnackBar().dismiss();

      console.log(retrievedData);
      this.dataService.$isUser = false;
      this.dataService.$isEditor = false;
      this.dataService.$isAdmin = true;
      this.saveCurrentUser(retrievedData);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['']);
    }, error => {
      this.alert.getSnackBar().dismiss();
      this.alert.displaySnackBar(error.error.error.message);
      console.error(error.error.error.message);
    });
  }
  saveCurrentUser(data) {
    const user = data.response;
    user.isEditor = false;
    user.isAdmin = true;
    localStorage.setItem('user', JSON.stringify(user));
  }

  get f() {
    return this.loginForm.controls;
  }

  goSignup() {
    this.loginForm.setValidators(null);
    this.router.navigate(['/signup/editor']);
  }

}
