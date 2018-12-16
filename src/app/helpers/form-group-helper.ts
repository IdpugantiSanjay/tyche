import { FormGroup } from '@angular/forms';

export class FormGroupHelper {
  private formGroup: FormGroup;

  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  getValue<T>(propertyName: string): T {
    if (!this.formGroup.contains(propertyName)) {
      throw new Error('No form control with name ' + propertyName);
    }

    return this.formGroup.controls[propertyName].value;
  }
}
