import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$'
      ),]),
    password: new FormControl('', [Validators.required]),
    cPassword: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private as: AuthService){}


  backToLogin(): void {
    this.router.navigateByUrl('/login');
  }


  async signup(): Promise<void> {
    const firstname = this.signupForm.value.firstname;
    const lastname = this.signupForm.value.lastname;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const cPassword = this.signupForm.value.cPassword;
    const username = firstname + ' ' + lastname;
    try {
      let response = await this.as.signup(firstname, lastname, email, password, cPassword, username);
      console.log(response);
    } catch (err) {
      alert('Signup failed: ');
    }
  }
}
