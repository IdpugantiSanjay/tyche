import { FormGroup } from '@angular/forms';

import * as _ from 'lodash';

export class FormGroupHelper {
  private formGroup: FormGroup;

  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  /**
   * Return the value of the control having key as property name
   * if the control with property name does not exist throw error
   * @param propertyName the of the control to get value
   * @throws error if control with property name does not exist
   */
  getValue<T>(propertyName: string): T {
    if (!this.formGroup.contains(propertyName)) {
      throw new Error('No form control with name ' + propertyName);
    }

    return this.formGroup.controls[propertyName].value;
  }

  /**
   * Clear all the control of the form
   */
  clear() {
    Object.keys(this.formGroup.value).forEach(field => this.formGroup.get(field).setValue(''));
  }
}
