import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpApiService } from '../services/http-api.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private fb: FormBuilder, private http: HttpApiService, private router: Router, private alert: AlertService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      shortDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      story: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(10000)]),
      title: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(60)]),
      file: new FormControl('')
    });
    // this.getTags();

  }
  getTags() {
    this.http.getTags().subscribe(
      data => this.tags = data.response
    );
  }

  get f() {
    return this.postForm.controls;
  }

  add(postData) {
    const user = JSON.parse(localStorage.getItem('user'));

    postData.editorId = user.id;
    postData.tags = this.tags;
    // postData.image = '';
    console.log(postData);
    // const image = this.postForm.controls.image;
    this.http.addPostForEditor(postData).subscribe(retrievedData => {
      this.alert.getSnackBar().dismiss();
      console.log(retrievedData);
      this.postForm.reset();
      this.postForm.markAllAsTouched();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/profile/editor']));
    }, error => {
      console.log(error.error.error.message);
      this.alert.getSnackBar().dismiss();
      this.alert.displaySnackBar(error.error.error.message);
    });
  }
  addTag(event) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push( value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeTag(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
