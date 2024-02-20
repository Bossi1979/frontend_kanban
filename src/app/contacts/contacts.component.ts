import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  selectedContact: number = -1;


  constructor(public data: DataService) { }


  selectContact(index: number) {
    this.selectedContact = index;
    
  }

}
