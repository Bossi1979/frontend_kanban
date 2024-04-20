import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';


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
  contact: Contact = new Contact();


  constructor(public data: DataService, private auth: AuthService, private contactService: ContactService) {
    this.checkForContactEdit();
  }


  /**
   * Closes the edit contact view by updating flags in the data object.
   * 
   * @returns {void}
   */
  closeEditContactView(): void {
    this.data.slideOut = true;
    setTimeout(() => {
      this.data.startEditContactView = false;
      this.data.shadowView = false;
      this.data.slideOut = false;
    }, 1100);
  }


  /**
   * Checks if the logged-in user can edit the selected contact and enables/disables the edit contact form accordingly.
   * 
   * @returns {void}
   */
  checkForContactEdit(): void {
    const checkValue = (this.data.allContacts[this.data.selectedContact].id_user == this.data.loggedUserData[0].id) || !this.data.allContacts[this.data.selectedContact].has_account;
    if (checkValue) this.editContactForm.enable();
    else this.editContactForm.disable();
  }


  /**
   * Asynchronously saves the edited contact by trimming inputs, updating the contact, and closing the edit contact view.
   * 
   * @returns {Promise<void>} A Promise that resolves when the edited contact is saved.
   */
  async saveEditContact(): Promise<void> {
    this.closeEditContactView();
    await this.contactService.trimInputs(this.editContactForm);
    await this.editContact(this.contact);
  }


  /**
   * Asynchronously edits a contact.
   * 
   * @param {Contact} contact - The contact object to be edited.
   * @returns {Promise<void>} A promise that resolves once the editing process is complete.
   */
  async editContact(contact: Contact): Promise<void> {
    if (this.editContactForm.valid) {
      try {
        this.contact.id = this.data.allContacts[this.data.selectedContact].id;
        this.contact.hasAccount = this.data.allContacts[this.data.selectedContact].has_account;
        await this.contactService.setContactValues(this.contact, this.editContactForm);
        const response = await this.auth.editContact(this.contact);
        this.data.allContacts = response;
        await this.data.generatedAssignedList();
        this.startEditContactDoneView();
      } catch {
        alert('Failed to edit contact');
      }
    }
  }


  /**
   * Starts the view for editing a contact with a edit message done overlay.
   * 
   * @returns {void}
   */
  startEditContactDoneView(): void {
    this.data.selectedMessageIndex = 1;
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }


  /**
   * Asynchronously deletes a contact by its ID and updates the UI accordingly.
   * 
   * @param {number} id - The ID of the contact to delete.
   * @param {number} index - The index of the contact in the list.
   * @returns {Promise<void>} A Promise that resolves when the contact is successfully deleted.
   */
  async deleteContact(id: number, index: number): Promise<void> {
    this.closeEditContactView();
    const response = await this.auth.deleteContact(id);
    if (response.error == 'none'){
      this.data.allContacts.splice(index, 1);
      this.data.assignedToList.splice(index, 1);
      this.startDeleteContactDoneView();
    }
  }


  /**
   * Initiates the "delete contact done" view with animations and overlays.
   * 
   * @returns {void}
   */
  startDeleteContactDoneView(): void {
    this.data.selectedMessageIndex = 2;
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }
}