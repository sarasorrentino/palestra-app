import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterDataPage } from './register-data.page';

describe('RegisterDataPage', () => {
  let component: RegisterDataPage;
  let fixture: ComponentFixture<RegisterDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
