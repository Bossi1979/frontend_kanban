import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-help-document',
  templateUrl: './help-document.component.html',
  styleUrl: './help-document.component.scss'
})
export class HelpDocumentComponent {


  constructor(
    public data: DataService,
    private menuService: MenuService
  ) { }


  /**
   * Navigates back to the summary by triggering mouse enter and selecting the menu.
   * This method is typically used for navigation purposes.
   * 
   * @returns {void}
   */
  backToSummary(): void {
    this.menuService.mouseEnter(1);
    this.menuService.selectMenu(1);
  }
}
