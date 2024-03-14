import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MenuService } from '../services/menu.service';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {


  constructor(
    private router: Router, 
    public data: DataService, 
    public menuService: MenuService,
    ) {
    const token = localStorage.getItem('token');
    if (token == "undefined" || token == undefined || token == null) router.navigateByUrl('/login');
    this.menuService.mouseEnter(1);
    this.menuService.selectMenu(1);
    this.data.innerWidth = window.innerWidth;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.data.innerWidth = window.innerWidth;
    console.log('resize event');
    this.resizeAction();
  }


  resizeAction(){
    if (this.data.innerWidth > 1100){
      this.data.shadowView = false;
      this.menuService.slideOutSidebar = true;
    } else {
      
    }
  }
}
