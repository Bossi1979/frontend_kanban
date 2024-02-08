import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';;
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private as: AuthService, private router: Router) { }


  async login(): Promise<any> {
    try {
      let response = await this.as.loginWithEmailAndPassword(this.email, this.password);
      
      localStorage.setItem('token', response['token']);
      console.log(response);
      // this.router.navigateByUrl('/todos')

    } catch(e){
      console.error(e);
      alert('Login failed');
    }
  }

}
