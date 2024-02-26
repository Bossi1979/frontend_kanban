import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {


  constructor(public data: DataService, private auth: AuthService) { }


  /**
   * Selects a contact by setting the index of the selected contact in the data object.
   * 
   * @param {number} index - The index of the contact to be selected.
   * @returns {void}
   */
  selectContact(index: number): void {
    this.data.selectedContact = index;
  }


  /**
   * Starts the shadow view by setting flags in the data object.
   * 
   * @returns {void}
   */
  startShadowView(): void {
    this.data.startAddContactView = true;
    this.data.shadowView = true;
  }


  /**
   * Starts the edit contact view by setting flags in the data object.
   * 
   * @returns {void}
   */
  startEditContactView(): void {
    this.data.startEditContactView = true;
    this.data.shadowView = true;
  }


  /**
   * Starts the view for adding a contact with a done message overlay by setting flags in the data object.
   * 
   * @returns {void}
   */
  startAddContactDoneView(): void {
    this.data.messageOverlayView= true;
    this.data.addContactDoneView = true;
  }


  async deleteContact(id: number, index: number): Promise<void> {
    const response = await this.auth.deleteContact(id);
    console.log(response);
    if (response.error == 'none'){
      this.data.allContacts.splice(index, 1);
      this.data.assignedToList.splice(index, 1);
      console.log(this.data.allContacts);
      this.startDeleteContactDoneView();
    }
  }


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
