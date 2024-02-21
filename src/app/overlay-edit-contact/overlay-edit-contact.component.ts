import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-overlay-edit-contact',
  templateUrl: './overlay-edit-contact.component.html',
  styleUrl: './overlay-edit-contact.component.scss'
})
export class OverlayEditContactComponent {
  editContactForm: FormGroup = new FormGroup({
    firstname: new FormControl(this.data.allContacts[this.data.selectedContact].firstname, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]),
    lastname: new FormControl(this.data.allContacts[this.data.selectedContact].lastname, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]),
    email: new FormControl(this.data.allContacts[this.data.selectedContact].email, [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$'
      ),]),
    phone: new FormControl(this.data.allContacts[this.data.selectedContact].phone, [
      Validators.pattern('^\\+?\\d+$'),
    ])
  });

  newContact: Contact;


  constructor(public data: DataService, private auth: AuthService) {

  }

  closeEditContactView() {
    this.data.startEditContactView = false;
    this.data.shadowView = false;
  }

}