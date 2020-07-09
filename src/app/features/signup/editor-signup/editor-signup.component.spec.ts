import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSignupComponent } from './editor-signup.component';

describe('EditorSignupComponent', () => {
  let component: EditorSignupComponent;
  let fixture: ComponentFixture<EditorSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
