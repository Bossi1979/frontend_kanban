import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-overlay-add-contact',
  templateUrl: './overlay-add-contact.component.html',
  styleUrl: './overlay-add-contact.component.scss'
})
export class OverlayAddContactComponent {
  addContactForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$'
      ),]),
    phone: new FormControl('', [
      Validators.pattern('^\\+?\\d+$'),
    ])
  });
  newContact: Contact = new Contact();


  constructor(public data: DataService, private auth: AuthService) { }


  /**
   * Closes the add contact view by updating flags in the data object.
   * 
   * @returns {void}
   */
  closeAddContactView(): void {
    this.data.startAddContactView = false;
    this.data.shadowView = false;
  }


  /**
   * Creates a new contact by trimming inputs and saving the new contact.
   * 
   * @returns {Promise<void>}
   */
  async createNewContact(): Promise<void> {
    await this.trimInputs();
    await this.saveNewContact();
  }


  /**
   * Saves the new contact if the addContactForm is valid.
   * 
   * @returns {Promise<void>}
   */
  async saveNewContact(): Promise<void> {
    if (this.addContactForm.valid) {
      try{
        await this.setNewContactValues();
        this.addContactForm.disable();
        const response: any = await this.auth.addNewContact(this.newContact);
        this.data.allContacts = response;
        await this.data.generatedAssignedList();
        this.resetValues();
      } catch (err) {
        console.log('failed to save newContact');
      }
    }
  }


  /**
   * Resets form values, closes add contact view, enables form, and starts add contact done view.
   * 
   * @returns {void}
   */
  resetValues(): void {
    this.addContactForm.reset();
    this.closeAddContactView();
    this.addContactForm.enable();
    this.startAddContactDoneView();
    this.newContact = new Contact();
  }


  /**
   * Sets values for the new contact based on form inputs.
   * 
   * @returns {Promise<any>}
   */
  async setNewContactValues(): Promise<any> {
    this.newContact.firstname = this.firstLetterToUpperCase(this.addContactForm.value.firstname);
    this.newContact.lastname = this.firstLetterToUpperCase(this.addContactForm.value.lastname);
    this.newContact.email = this.addContactForm.value.email.toLowerCase();
    this.newContact.phone = this.addContactForm.value.phone;
    this.newContact.username = this.newContact.firstname + ' ' + this.newContact.lastname;
    this.newContact.nameAbbreviation = this.newContact.firstname.substring(0, 1) + this.newContact.lastname.substring(0, 1);
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
   * Trims whitespace from input values in the add contact form.
   * 
   * @returns {Promise<void>}
   */
  async trimInputs(): Promise<void> {
    this.addContactForm.get('firstname').setValue(this.addContactForm.value.firstname.trim())
    this.addContactForm.get('lastname').setValue(this.addContactForm.value.lastname.trim());
    this.addContactForm.get('email').setValue(this.addContactForm.value.email.trim());
    this.addContactForm.get('phone').setValue(this.addContactForm.value.phone.trim());
  }


  /**
   * Starts the view for adding a contact with a done message overlay.
   * 
   * @returns {void}
   */
  startAddContactDoneView(): void {
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }
}
