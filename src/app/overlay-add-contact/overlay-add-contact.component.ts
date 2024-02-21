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

  newContact: Contact;

  constructor(public data: DataService, private auth: AuthService) {

  }

  closeAddContactView() {
    this.data.startAddContactView = false;
    this.data.shadowView = false;
  }


  async createNewContact(): Promise<void> {
    await this.trimInputs();
    await this.saveNewContact();
  }

  async saveNewContact(): Promise<void> {
    this.newContact = new Contact();
    if (this.addContactForm.valid) {
      await this.setNewContactValues();
      this.addContactForm.disable();
      const response: any = await this.auth.addNewContact(this.newContact);
      console.log('newContactAdd:', response);
      this.data.allContacts = response;
      await this.data.generatedAssignedList();
      this.addContactForm.reset();
      this.closeAddContactView();
      this.addContactForm.enable();
    }
  }


  async setNewContactValues(): Promise<any> {
    this.newContact.firstname = this.addContactForm.value.firstname;
    this.newContact.lastname = this.addContactForm.value.lastname;
    this.newContact.email = this.addContactForm.value.email;
    this.newContact.phone = this.addContactForm.value.phone;
    this.newContact.username = this.addContactForm.value.firstname + ' ' + this.addContactForm.value.lastname;
    this.newContact.nameAbbreviation = this.addContactForm.value.firstname.substring(0, 1) + this.addContactForm.value.lastname.substring(0, 1);
  }


  async trimInputs(): Promise<void> {
    this.addContactForm.get('firstname').setValue(this.addContactForm.value.firstname.trim())
    this.addContactForm.get('lastname').setValue(this.addContactForm.value.lastname.trim());
    this.addContactForm.get('email').setValue(this.addContactForm.value.email.trim());
    this.addContactForm.get('phone').setValue(this.addContactForm.value.phone.trim());
  }

}
