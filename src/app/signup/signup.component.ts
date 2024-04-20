import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Signup } from '../models/signup.model';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$'
      ),]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ]),
    cPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),
    agreeTerms: new FormControl(false, [Validators.requiredTrue])
  });
  signupData: Signup = new Signup();


  constructor(
    private router: Router,
    private as: AuthService,
    public data: DataService
  ) { }


  /**
   * Navigates the user back to the login page.
   * 
   * @returns {void}
   */
  backToLogin(): void {
    this.router.navigateByUrl('/login');
  }


  /**
   * Handles the signup process by trimming inputs, setting signup data values, and sending a signup request.
   * 
   * @returns {Promise<void>}
   */
  async signup(): Promise<void> {
    await this.trimInputs();
    await this.setSignupDataValues();
    if (this.signupForm.valid && (this.signupData.password == this.signupData.cPassword)) {
      try {
        let response = await this.as.signup(this.signupData);
        if (response['error'] == 'none') this.signupSuccessAction();
      } catch (err) {
        this.signupErrorAction(err);
      }
    }
  }


  /**
   * Navigates to the login page upon successful signup and resets signup data.
   * 
   * @returns {void}
   */
  signupSuccessAction(): void {
    this.router.navigateByUrl('/login');
    this.signupData = new Signup();
  }


  /**
   * Displays an alert for signup failure and resets signup data.
   * 
   * @param {any} error - The error object.
   * @returns {void}
   */
  signupErrorAction(error: any): void {
    alert('Signup failed! Please try again later.');
  }


  /**
   * Sets values for the signup data based on form inputs.
   * 
   * @returns {Promise<void>}
   */
  async setSignupDataValues(): Promise<void> {
    this.signupData.firstname = this.firstLetterToUpperCase(this.signupForm.value.firstname);
    this.signupData.lastname = this.firstLetterToUpperCase(this.signupForm.value.lastname);
    this.signupData.email = this.signupForm.value.email.toLowerCase();
    this.signupData.password = this.signupForm.value.password;
    this.signupData.cPassword = this.signupForm.value.cPassword;
    this.signupData.username = this.signupData.firstname + ' ' + this.signupData.lastname;
  }


  /**
   * Trims whitespace from input values in the signup form.
   * 
   * @returns {Promise<void>}
   */
  async trimInputs(): Promise<void> {
    this.signupForm.get('firstname').setValue(this.signupForm.value.firstname.trim())
    this.signupForm.get('lastname').setValue(this.signupForm.value.lastname.trim());
    this.signupForm.get('email').setValue(this.signupForm.value.email.trim());
    this.signupForm.get('password').setValue(this.signupForm.value.password.trim());
    this.signupForm.get('cPassword').setValue(this.signupForm.value.cPassword.trim());
  }


  /**
   * Converts the first letter of a string to uppercase.
   * 
   * @param {string} value - The string value to convert.
   * @returns {string} The string with the first letter converted to uppercase.
   */
  firstLetterToUpperCase(value: string): string {
    value = value.replace(value[0], value[0].toUpperCase());
    return value;
  }


  /**
   * Open the Privacy Policy Document
   * 
   * @retuns {void}
   */
  openPrivacy(): void {
    this.data.signupPrivacy = true;
  }


  /**
   * Open the Legal Document
   * 
   * @retuns {void}
   */
  openLegal(): void {
    this.data.signupLegal = true;
  }
}
