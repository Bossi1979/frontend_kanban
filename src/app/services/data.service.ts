import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedMenu: number = 0;
  loggedUserData: any[] = [];
  allContacts: any[] = [];
  allContacts$: any = [];

// Varialblen für AddTask
assignedToList: any[] = [];

  constructor(private as: AuthService) { 
    if (localStorage.getItem('userData')){
      this.loggedUserData = JSON.parse(localStorage.getItem('userData'));
      this.loadDatas();
    }
  }


  async loadDatas(){
    console.log('Loading data...');
    await this.getContacts();
    await this.generatedAssignedList();
  }


  async setLoggedUserData(): Promise<void> {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const nameAbbreviation = firstname[0] + lastname[0];
    const id = localStorage.getItem('id');
    
    const json = {
      "username": username,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "nameAbbreviation": nameAbbreviation,
      'id': id,
    }
    this.loggedUserData[0] = json;
    localStorage.setItem('userData', JSON.stringify(this.loggedUserData));
  }


  async getContacts(): Promise<void> {
    const response: any = await this.as.getAllContacts();
    this.allContacts = response;
    this.setUserBackgroundColor();
    console.log('contacts', this.allContacts);
  }


  userBackgroundColor: string = '#000000';
  
  setUserBackgroundColor(): void {
    const searchedId = this.loggedUserData[0].id
    const contactIndex = this.allContacts.findIndex(contact => contact.id_user == searchedId);
    if(contactIndex >= 0){
      this.userBackgroundColor = this.allContacts[contactIndex].background_color;
    }
    console.log('contact Index: ',contactIndex)
  }


// für AddTask

async generatedAssignedList(): Promise<void> {
  this.assignedToList = this.allContacts.slice();
  console.log('assigned to list: ', this.assignedToList);
}



}
