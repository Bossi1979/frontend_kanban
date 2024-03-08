import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-help-document',
  templateUrl: './help-document.component.html',
  styleUrl: './help-document.component.scss'
})
export class HelpDocumentComponent {


  constructor(public data: DataService, private menuService: MenuService){}

  backToSummary(){
    this.menuService.mouseEnter(1);
    this.menuService.selectMenu(1);
  }

}
