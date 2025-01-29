import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false,
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string = 'Default error message';
  @Input() field!: AbstractControl | null;
  @Input() error: string = '';

  constructor() {}

  ngOnInit() {}

  shouldShowComponent(): boolean {
    return !!(this.field?.touched && this.field.errors?.[this.error]);
  }
}

/*import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false,
})
export class ErrorMessageComponent  implements OnInit {

  @Input() message: string = "Default error message";
  @Input() field!: FormGroup;
  @Input() error: string = "";
  constructor() { }

  ngOnInit() {}

  shouldShowComponent(){
    // form.get('email')?.touched && form.get('email')?.errors?.['required']
    if(this.field.touched && this.field.errors?.[this.error]){
      return true;
    }
    return false;
  }

}*/
