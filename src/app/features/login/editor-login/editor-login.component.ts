import { AlertService } from './../../profile/services/alert.service';
import { DataPropagateService } from './../../../core/services/data/data-propagate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-editor-login',
  templateUrl: './editor-login.component.html',
  styleUrls: ['./editor-login.component.scss']
})
export class EditorLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private httpService: HttpApiService,
              public router: Router, private dataService: DataPropagateService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.minLength(6), Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }

  login(loginData) {
    this.httpService.editorLogin(loginData).subscribe(retrievedData => {
      this.alert.getSnackBar().dismiss();

      console.log(retrievedData);
      this.dataService.$isUser = false;
      this.dataService.$isEditor = true;
      const success = this.saveCurrentUser(retrievedData);
      if (!success) {
        return;
      }
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
    user.isEditor = true;
    user.isAdmin = false;
    if (user.approved === false) {
      this.alert.displaySnackBar('Your profile is not approved by the admin yet. Please contact admin');
      return false;
    }
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  get f() {
    return this.loginForm.controls;
  }

  goSignup() {
    this.loginForm.setValidators(null);
    this.router.navigate(['/signup/editor']);
  }
}
