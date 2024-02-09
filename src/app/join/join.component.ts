import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {

  constructor(router: Router) {
    const token = localStorage.getItem('token');
    if (token == "undefined") {
      router.navigateByUrl('/login');
    }
  }

}
