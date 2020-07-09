import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLoginComponent } from './editor-login.component';

describe('EditorLoginComponent', () => {
  let component: EditorLoginComponent;
  let fixture: ComponentFixture<EditorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
