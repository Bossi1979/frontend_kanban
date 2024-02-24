import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {


  constructor(public data: DataService) { }


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
}
