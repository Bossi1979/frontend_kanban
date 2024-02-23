import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {


  constructor(public data: DataService) { }


  selectContact(index: number) {
    this.data.selectedContact = index;
  }


  startShadowView(){
    this.data.startAddContactView = true;
    this.data.shadowView = true;
  }

  startEditContactView(){
    this.data.startEditContactView = true;
    this.data.shadowView = true;
  }


  startAddContactDoneView(){
    this.data.messageOverlayView= true;
    this.data.addContactDoneView = true;
  }



}
