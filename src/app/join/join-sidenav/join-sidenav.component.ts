import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-join-sidenav',
  templateUrl: './join-sidenav.component.html',
  styleUrl: './join-sidenav.component.scss'
})
export class JoinSidenavComponent {


  constructor(
    public data: DataService,
    public menuService: MenuService
  ) { }
}
