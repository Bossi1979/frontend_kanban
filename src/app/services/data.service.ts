import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedMenu: number = 0;
  loggedUserData: any[] = [];

  constructor() { 
    if (localStorage.getItem('userData')){
      this.loggedUserData = JSON.parse(localStorage.getItem('userData'));
    }
    
  }


  async setLoggedUserData(): Promise<void> {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const nameAbbreviation = firstname[0] + lastname[0];
    
    const json = {
      "username": username,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "nameAbbreviation": nameAbbreviation
    }
    this.loggedUserData[0] = json;
    localStorage.setItem('userData', JSON.stringify(this.loggedUserData));
  }
}
