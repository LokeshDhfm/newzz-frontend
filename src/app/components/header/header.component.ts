import { FormBuilder } from '@angular/forms';
import { UserLoginComponent } from './../../features/login/user-login/user-login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataPropagateService } from 'src/app/core/services/data/data-propagate.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private dialog: MatDialog, private router: Router, private dataService: DataPropagateService) { }

  ngOnInit(): void {
  }
  getLoggStatus() {
    // if (JSON.parse(localStorage.getItem('isLoggedIn')) === true) {
    //   return true;
    // } else {
    //   return false;
    // }
    return JSON.parse(localStorage.getItem('isLoggedIn')) === null ? false : true;
  }

  userLogin() {
    this.router.navigate(['/login/user']);
  }

  editorLogin() {
    this.router.navigate(['/login/editor']);
  }

  goToProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      if (user.isEditor === true) {
        this.router.navigate(['profile/editor']);
        return;
      }
      if (user.isAdmin === true) {
        this.router.navigate(['profile/admin']);
      } else {
        this.router.navigate(['profile/user']);
      }
    }
  }
  isProfilePage() {
    // console.log('', window.location.href.includes('profile'));
    return !window.location.href.includes('profile');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  adminLogin() {
    this.router.navigate(['/login/admin']);
  }
}
