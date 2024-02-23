import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Signup } from '../models/signup.model';

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
  })

  signupData: Signup = new Signup();


  constructor(private router: Router, private as: AuthService){}


  backToLogin(): void {
    this.router.navigateByUrl('/login');
  }


  async signup(): Promise<void> {
    await this.trimInputs();
    await this.setSignupDataValues();
    if(this.signupForm.valid && (this.signupData.password == this.signupData.cPassword)){
      try {
      let response = await this.as.signup(this.signupData);
      console.log(response);
      if (response['error'] == 'none'){
        this.router.navigateByUrl('/login');
        this.signupData = new Signup();
        console.log(this.signupData);
      }
    } catch (err) {
      alert('Signup failed! Please try again later.');
      this.signupData = new Signup();
      console.log(this.signupData);
    }
    }
    
  }


  async setSignupDataValues(): Promise<void> {
    this.signupData.firstname = this.firstLetterToUpperCase(this.signupForm.value.firstname);
    this.signupData.lastname = this.firstLetterToUpperCase(this.signupForm.value.lastname);
    this.signupData.email = this.signupForm.value.email.toLowerCase();
    this.signupData.password = this.signupForm.value.password;
    this.signupData.cPassword = this.signupForm.value.cPassword;
    this.signupData.username = this.signupData.firstname + ' ' + this.signupData.lastname;
  }


  async trimInputs(): Promise<void> {
    this.signupForm.get('firstname').setValue(this.signupForm.value.firstname.trim())
    this.signupForm.get('lastname').setValue(this.signupForm.value.lastname.trim());
    this.signupForm.get('email').setValue(this.signupForm.value.email.trim());
    this.signupForm.get('password').setValue(this.signupForm.value.password.trim());
    this.signupForm.get('cPassword').setValue(this.signupForm.value.cPassword.trim());
  }


  firstLetterToUpperCase(value: string): string {
    value = value.replace(value[0], value[0].toUpperCase());
    console.log('uppercase: ', value);
    return value;
  }



  getSignupFormValues(): any {
    let firstnameValue: string = this.signupForm.get('firstname')?.value;
    let lastnameValue: string = this.signupForm.get('lastname')?.value;
    let emailValue: string = this.signupForm.get('email')?.value;
    let passwordValue: string = this.signupForm.get('password')?.value;
    let cPasswordValue: string = this.signupForm.get('cPassword')?.value;
  }
}
