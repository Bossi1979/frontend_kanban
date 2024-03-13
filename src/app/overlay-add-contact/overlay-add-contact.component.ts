import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { AuthService } from '../services/auth.service';
import { ContactService } from '../services/contact.service';


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


  constructor(
    public data: DataService,
    private auth: AuthService,
    private contactService: ContactService
  ) { }


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
    await this.contactService.trimInputs(this.addContactForm);
    await this.saveNewContact();
  }


  /**
   * Saves the new contact if the addContactForm is valid.
   * 
   * @returns {Promise<void>}
   */
  async saveNewContact(): Promise<void> {
    if (this.addContactForm.valid) {
      try {
        await this.contactService.setContactValues(this.newContact, this.addContactForm);
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
   * Starts the view for adding a contact with a done message overlay.
   * 
   * @returns {void}
   */
  startAddContactDoneView(): void {
    this.data.selectedMessageIndex = 0;
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }
}
