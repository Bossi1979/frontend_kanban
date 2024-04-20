import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-mobil-bottom-menu',
  templateUrl: './mobil-bottom-menu.component.html',
  styleUrl: './mobil-bottom-menu.component.scss'
})
export class MobilBottomMenuComponent {


  constructor(
    public menuService: MenuService,
    public data: DataService,
    ){ }
}
