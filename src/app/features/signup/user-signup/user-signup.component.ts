import { AlertService } from './../../profile/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpApiService } from '../services/http-api.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  signupForm: FormGroup;
  maxDate: Date;
  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpApiService,
              private alert: AlertService) {
    const currentDate = new Date();
    this.maxDate = new Date( currentDate.getFullYear() - 18, currentDate.getMonth() - 0,  currentDate.getDate() - 0);
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl(''),
      phone: new FormControl('', [Validators.pattern('^[9876][0-9]{9}$'), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.min(6), Validators.required]),
    });
  }
  get f() {
    return this.signupForm.controls;
  }

  signup(signupForm) {
    this.httpService.userSignup(signupForm).subscribe(retrievedData => {
      this.alert.getSnackBar().dismiss();
      console.log(retrievedData);
      this.router.navigate(['/login/user']);
    }, error => {
      this.alert.getSnackBar().dismiss();
      this.alert.displaySnackBar(error.error.error.message);
    });
  }

  goLogin() {
    this.router.navigate(['/login/user']);
  }

}
