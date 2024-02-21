import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  public  async loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    const url = environment.baseUrl + "/login/";
    const body = {
      "email": email.toLowerCase(),
      "password": password,
    };
    return lastValueFrom(this.http.post(url, body));
  }


  public async logout(): Promise<any> {
    const url = environment.baseUrl + "/logout/";
    return lastValueFrom(this.http.get(url));
  }


  public async signup(firstname: string, lastname: string, email: string, password: string, cPassword: string, username: string): Promise<any>{
    const url = environment.baseUrl + "/register/";
    const body = {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "password": password,
      "cPassword": cPassword,
      "username": username
    };
    return lastValueFrom(this.http.post(url, body));
  }

  
  public async getAllContacts(){
    const url = environment.baseUrl + "/contacts/";
    return lastValueFrom(this.http.get(url));
  }

  public async addNewContact(newContact: Contact){
    const url = environment.baseUrl + "/add_contact/";
    return lastValueFrom(this.http.post(url, newContact.createContactObject()));
  }


  public async saveTask(task: any[]): Promise<any>{
    const url = environment.baseUrl + "/add_task/";
    return lastValueFrom(this.http.post(url, task));
  }
}
