import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  public  async loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    const url = environment.baseUrl + "/login/";
    const body = {
      "email": email,
      "password": password,
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
