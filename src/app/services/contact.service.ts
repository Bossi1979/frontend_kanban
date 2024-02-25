import { Injectable } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Contact } from '../models/contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {


  constructor() { }


  /**
   * Asynchronously sets contact values based on form data.
   * 
   * @param {Contact} contactData - The contact data object to be modified.
   * @param {FormGroup} form - The form containing the data to update contact values.
   */
  async setContactValues(contactData: Contact, form: FormGroup): Promise<void> {
    contactData.firstname = this.firstLetterToUpperCase(form.value.firstname);
    contactData.lastname = this.firstLetterToUpperCase(form.value.lastname);
    contactData.email = form.value.email.toLowerCase();
    contactData.phone = form.value.phone;
    contactData.username = contactData.firstname + ' ' + contactData.lastname;
    contactData.nameAbbreviation = contactData.firstname.substring(0, 1) + contactData.lastname.substring(0, 1);
  }


  /**
   * Converts the first letter of a string to uppercase.
   * 
   * @param {string} value - The string value to convert.
   * @returns {string} The string with the first letter converted to uppercase.
   */
  firstLetterToUpperCase(value: string): string {
    value = value.replace(value[0], value[0].toUpperCase());
    return value;
  }


  /**
   * Asynchronously trims whitespace from the input values in the form.
   * 
   * @param {FormGroup} form - The form containing the input values to be trimmed.
   */
  async trimInputs(form: FormGroup): Promise<void> {
    form.get('firstname').setValue(form.value.firstname.trim())
    form.get('lastname').setValue(form.value.lastname.trim());
    form.get('email').setValue(form.value.email.trim());
    form.get('phone').setValue(form.value.phone.trim());
  }

}
