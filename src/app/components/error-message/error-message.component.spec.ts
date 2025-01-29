import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message.component';
import { FormControl, FormGroup } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('shouldShowComponent', () => {
    component.field = new FormGroup({email: new FormControl()});

    component.field.markAsTouched();
    component.field.setErrors({required: true});
    component.error = "required";

    expect(component.shouldShowComponent()).toBeTruthy();
  });

  it('should show error message on field touched or error present', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = "anyError";
    
    expect(component.shouldShowComponent()).toBeTruthy();
  });

  it('should hide error message on field not touched', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.setErrors({anyError: true});
    component.error = "anyError";
    
    expect(component.shouldShowComponent()).toBeFalsy();
  });

  it('should hide error message on field touched, but no errors', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.markAsTouched();
    component.error = "anyError";
    
    expect(component.shouldShowComponent()).toBeFalsy();
  });

  it('should hide error message on field  touched, but it is a different error', () => {
    component.field = new FormGroup({anyField: new FormControl()});

    component.field.markAsTouched();
    component.field.setErrors({anyError: true});
    component.error = "anotherError";
    
    expect(component.shouldShowComponent()).toBeFalsy();
  });

});
