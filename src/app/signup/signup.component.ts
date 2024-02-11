import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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


  constructor(private router: Router, private as: AuthService){}


  backToLogin(): void {
    this.router.navigateByUrl('/login');
  }


  async signup(): Promise<void> {
    await this.trimInputs();
    const firstname = this.signupForm.value.firstname;
    const lastname = this.signupForm.value.lastname;
    const email = this.signupForm.value.email.toLowerCase();
    const password = this.signupForm.value.password;
    const cPassword = this.signupForm.value.cPassword;
    const username = firstname + ' ' + lastname;
    if(this.signupForm.valid && (password == cPassword)){
      try {
      let response = await this.as.signup(firstname, lastname, email, password, cPassword, username);
      console.log(response);
      if (response['error'] == 'none'){
        this.router.navigateByUrl('/login');
      }
    } catch (err) {
      alert('Signup failed! Please try again later.');
    }
    }
    
  }


  async trimInputs(): Promise<void> {
    console.log(this.signupForm.value.firstname.length);
    let firstnameValue: string = this.signupForm.get('firstname')?.value;
    let lastnameValue: string = this.signupForm.get('lastname')?.value;
    let emailValue: string = this.signupForm.get('email')?.value;
    let passwordValue: string = this.signupForm.get('password')?.value;
    let cPasswordValue: string = this.signupForm.get('cPassword')?.value;
    this.signupForm.get('firstname')?.setValue(firstnameValue.trim());
    this.signupForm.get('lastname')?.setValue(lastnameValue.trim());
    this.signupForm.get('email')?.setValue(emailValue.trim());
    this.signupForm.get('password')?.setValue(passwordValue.trim());
    this.signupForm.get('cPassword')?.setValue(cPasswordValue.trim());
  }



  getSignupFormValues(): any {
    let firstnameValue: string = this.signupForm.get('firstname')?.value;
    let lastnameValue: string = this.signupForm.get('lastname')?.value;
    let emailValue: string = this.signupForm.get('email')?.value;
    let passwordValue: string = this.signupForm.get('password')?.value;
    let cPasswordValue: string = this.signupForm.get('cPassword')?.value;
  }
}
