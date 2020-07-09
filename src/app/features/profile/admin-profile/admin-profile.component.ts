import { HttpApiService } from './../services/http-api.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  editors = [];
  editorsApproved = [];
  constructor(private httpService: HttpApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getTobeApprovedEditors();
    this.getApprovedEditors();
  }
  getApprovedEditors() {
    this.httpService.getApprovedEditors().subscribe( retrivedData => {
      this.editorsApproved = retrivedData.response;
    });
  }
  getTobeApprovedEditors() {
    this.httpService.getUnApprovedEditors().subscribe( retrivedData => {
      this.editors = retrivedData.response;
    });
  }

  approve(editorId) {
    this.httpService.approveEditor(editorId).subscribe(retrivedData => {
      this.alert.getSnackBar().dismiss();
      console.log('', retrivedData);
      this.getApprovedEditors();
      this.getTobeApprovedEditors();
      this.alert.getSnackBar().dismiss();
    }, error => {
      console.log(error.error.error.message);
      this.alert.displaySnackBar(error.error.error.message);
    });
  }
}
