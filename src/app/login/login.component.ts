import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';;
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginFailed = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$'
      ),]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])
  });
  localStorageItems: any[] = [
    { key: 'token', value: 'token' },
    { key: 'username', value: 'username' },
    { key: 'email', value: 'email' },
    { key: 'firstname', value: 'firstname' },
    { key: 'lastname', value: 'lastname' },
    { key: 'id', value: 'id' }
  ];


  constructor(private as: AuthService, private router: Router, private data: DataService) { }


  /**
   * Handles the login process by sending a request with email and password, and takes appropriate actions based on the response.
   * 
   * @returns {Promise<any>} A promise that resolves with the result of the login process.
   */
  async login(): Promise<any> {
    try {
      let response = await this.as.loginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
      if (response['token'] != "undefined") this.loginSuccessAction(response);
      else if (response['error'] == 'Login failed') this.showEmailAndOrPasswordWrongMessage();
    } catch (e) {
      alert('Login failed');
    }
  }


  /**
   * Shows a message indicating that the email and/or password is wrong.
   * 
   * @returns {void}
   */
  showEmailAndOrPasswordWrongMessage(): void {
    this.loginFailed = true;
  }


  /**
   * Takes actions upon successful login, such as setting local storage, 
   * setting logged user data, fetching contacts, and navigating to a specific page.
   * 
   * @param {any} response - The response object from the login request.
   * @returns {Promise<void>}
   */
  async loginSuccessAction(response: any): Promise<void> {
    await this.setLocalStorage(response);
    await this.data.setLoggedUserData();
    await this.data.getContacts();
    this.router.navigateByUrl('/join');
  }


  /**
   * Sets local storage items based on the response data.
   * 
   * @param {any} response - The response object from the login request.
   * @returns {Promise<void>}
   */
  async setLocalStorage(response: any): Promise<void> {
    this.localStorageItems.forEach(item => {
      localStorage.setItem(item.key, response[item.value]);
    });
  }


  /**
   * Navigates to the signup page.
   * 
   * @returns {void}
   */
  goToSignupPage(): void {
    this.router.navigateByUrl('/signup');
  }


  /**
   * Resets the warning flag indicating login failure due to wrong email and or password.
   * 
   * @returns {void}
   */
  resetWarning(): void {
    this.loginFailed = false;
  }
}
