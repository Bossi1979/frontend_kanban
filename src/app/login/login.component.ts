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

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$'
      ),]),
    password: new FormControl('', [Validators.required])
  });


  constructor(private as: AuthService, private router: Router, private data: DataService) { }


  async login(): Promise<any> {
    try {
      let response = await this.as.loginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
      
      localStorage.setItem('token', response['token']);
      localStorage.setItem('username', response['username']);
      localStorage.setItem('email', response['email']);
      console.log(response);

      this.router.navigateByUrl('/join');

    } catch(e){
      console.error(e);
      alert('Login failed');
    }
  }


  signup():void {
    this.router.navigateByUrl('/signup');
  }

}
