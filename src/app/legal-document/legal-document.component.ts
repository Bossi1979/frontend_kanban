import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-legal-document',
  templateUrl: './legal-document.component.html',
  styleUrl: './legal-document.component.scss'
})
export class LegalDocumentComponent {
  

  constructor(
    public menuService: MenuService,
    public data: DataService
  ){}


  /**
   * Navigates back to the summary by triggering mouse enter and selecting the menu.
   * This method is typically used for navigation purposes.
   * 
   * @returns {void}
   */
  backToSummary(): void{
    if(!this.data.signupLegal){
      this.menuService.mouseEnter(1);
      this.menuService.selectMenu(1);
    } else {
      this.data.signupLegal = false;
    }
  }
}
