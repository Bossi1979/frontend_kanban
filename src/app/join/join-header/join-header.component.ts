import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-header',
  templateUrl: './join-header.component.html',
  styleUrl: './join-header.component.scss'
})
export class JoinHeaderComponent {

  constructor(public data: DataService, private as: AuthService, private router: Router){}


  async logout(){
    try{
      this.router.navigateByUrl('/login');
      let response = await this.as.logout();
      console.log(response.message);
      if(response.message == 'logout successfully'){
        localStorage.clear();
      }
    } catch(err){
      alert('logout error');
    }
  }


  openHelpDocument(){
    this.data.selectedMenu = 7;
  }

}
