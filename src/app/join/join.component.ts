import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {

  constructor(private router: Router, public data: DataService) {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token == "undefined" || token == undefined || token == null) {
      router.navigateByUrl('/login');
    }
  }

}
