import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';;
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
    ]),
    remember: new FormControl('', [

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


  constructor(
    private as: AuthService,
    private router: Router,
    private data: DataService
  ) {
    this.checkRememberStatusLocalStorage();
    console.log('login initialized');
  }


  /**
   * Handles the login process by sending a request with email and password, and takes appropriate actions based on the response.
   * 
   * @returns {Promise<any>} A promise that resolves with the result of the login process.
   */
  async login(): Promise<any> {
    try {
      let response = await this.as.loginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
      if (response['token'] != undefined) this.loginSuccessAction(response);
      else if (response['error'] == 'Login failed') this.showEmailAndOrPasswordWrongMessage();
    } catch (e) {
      alert(e.statusText);
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


  /**
   * Simulates a guest login by setting predefined email and password values in the login form.
   * 
   * @returns {void}
   */
  guestLogin(): void {
    this.loginForm.value.email = 'guest@guest.de';
    this.loginForm.value.password = 'Guest+Login-0815';
  }


  /**
   * Function to update remember status after a delay.
   * 
   * @returns {void}
   */
  rememberClicked(): void {
    setTimeout(() => {
      this.as.rememberStatus = this.loginForm.get('remember').value;
      localStorage.setItem('remember status join:', this.as.rememberStatus.toString());
    }, 500);
  }


  /**
   * Function to check remember status from local storage and update form accordingly.
   * 
   * @returns {void}
   */
  checkRememberStatusLocalStorage(): void {
    let rememberStatus = localStorage.getItem('remember status join:');
    if (rememberStatus == 'true') {
      this.as.rememberStatus = true;
      this.loginForm.get('remember').setValue(true);
      if (localStorage.getItem('email')) this.loginForm.get('email').setValue(localStorage.getItem('email'));
    } else {
      this.as.rememberStatus = false;
      this.loginForm.get('remember').setValue(false);
    }
  }
}
