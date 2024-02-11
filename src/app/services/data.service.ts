import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedMenu: number = 0;
  loggedUserData: any[] = [];
  allContacts: any[] = [];

  characterNumbers: any = {
    "A": 141,
    "B": 282,
    "C": 423,
    "D": 564,
    "E": 705,
    "F": 846,
    "G": 987,
    "H": 1128,
    "I": 1269,
    "J": 1410,
    "K": 1551,
    "L": 1692,
    "M": 1833,
    "N": 1974,
    "O": 2115,
    "P": 2256,
    "Q": 2397,
    "R": 2538,
    "S": 2679,
    "T": 2820,
    "U": 2961,
    "V": 3102,
    "W": 3243,
    "X": 3384,
    "Y": 3525,
    "Z": 3666,
    "Ä": 3807,
    "Ö": 3948,
    "Ü": 4089,
    "ß": 4230,
};

  constructor(private as: AuthService) { 
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


  async getContacts(): Promise<void> {
    const response: any = await this.as.getAllContacts();
    this.allContacts = response;
    await this.getBackgroundColors();
    console.log(this.allContacts);
  }


  userBackgroundColor: string = '#000000';
  async getUserColors(){
    let userAbbreviation = this.loggedUserData[0].nameAbbreviation;
    let firstCharacter = userAbbreviation[0];
    let secondCharacter = userAbbreviation[1];
    let firstIndex = this.characterNumbers[firstCharacter];
    let secondIndex = this.characterNumbers[secondCharacter];
    console.log(firstIndex, secondIndex);
    console.log(this.decimalToHex(firstIndex), this.decimalToHex(secondIndex));
    let newBackground = '#' + this.decimalToHex(firstIndex) + this.decimalToHex(secondIndex);
    console.log(newBackground);
    this.userBackgroundColor = newBackground;
  }


  async getBackgroundColors(): Promise<void> {
    this.allContacts.forEach(contact => {
      let firstCharacter = contact.first_name[0];
      let secondCharacter = contact.last_name[0];
      contact["nameAbbreviation"] = firstCharacter + secondCharacter;
      let firstIndex = this.characterNumbers[firstCharacter];
      let secondIndex = this.characterNumbers[secondCharacter];
      let newBackground = '#' + this.decimalToHex(firstIndex) + this.decimalToHex(secondIndex);
      contact["backgroundColor"] = newBackground;
    });
  }

  decimalToHex(number: number): string {
    // Die Zahl in einen Hexadezimalstring mit drei Stellen umwandeln
    const hexString = number.toString(16).padStart(3, '0');

    return hexString;
}




}
