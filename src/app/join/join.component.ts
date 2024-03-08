import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MenuService } from '../services/menu.service';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {


  constructor(private router: Router, public data: DataService, private menuService: MenuService) {
    const token = localStorage.getItem('token');
    if (token == "undefined" || token == undefined || token == null) router.navigateByUrl('/login');
    this.menuService.mouseEnter(1);
    this.menuService.selectMenu(1);
  }

}
