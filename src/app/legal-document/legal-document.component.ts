import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-legal-document',
  templateUrl: './legal-document.component.html',
  styleUrl: './legal-document.component.scss'
})
export class LegalDocumentComponent {

  constructor(public menuService: MenuService){}


  backToSummary(){
    this.menuService.mouseEnter(1);
    this.menuService.selectMenu(1);
  }

}
