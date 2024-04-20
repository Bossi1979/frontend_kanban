import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-privacy-document',
  templateUrl: './privacy-document.component.html',
  styleUrl: './privacy-document.component.scss'
})
export class PrivacyDocumentComponent {


  constructor(
    public menuService: MenuService,
    public data: DataService
  ) { }


  /**
   * Navigates back to the summary by triggering mouse enter and selecting the menu.
   * This method is typically used for navigation purposes.
   * 
   * @returns {void}
   */
  backToSummary(): void {
    if(!this.data.signupPrivacy){
      this.menuService.mouseEnter(1);
      this.menuService.selectMenu(1);
    } else {
      this.data.signupPrivacy = false;
    }
  }
}
