import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  summaryScr: string = "../../../assets/img/sidenav/summary.png";
  addScr: string = "../../../assets/img/sidenav/add_task.png";
  boardScr: string = "../../../assets/img/sidenav/board.png";
  contactsScr: string = "../../../assets/img/sidenav/contacts.png";
  selectedMenu: number = 0;
  headerSubmenuView: boolean = false;
  slideOutSidebar: boolean = true;


  constructor(
    private data: DataService
  ) { }


  /**
   * Handles mouse enter event for menu items by updating corresponding image sources.
   * 
   * @param {number} number - The menu number. (1 => Summary, 2=> Add Task, 3=> Board, 4=> Contacts, 7=> Help)
   * @returns {void}
   */
  mouseEnter(number: number): void {
    if (number === 1 && this.data.selectedMenu != 1) this.summaryScr = "../../../assets/img/sidenav/summary_white.png";
    else if (number === 2 && this.data.selectedMenu != 2) this.addScr = "../../../assets/img/sidenav/add_task_white.png";
    else if (number === 3 && this.data.selectedMenu != 3) this.boardScr = "../../../assets/img/sidenav/board_white.png";
    else if (number === 4 && this.data.selectedMenu != 4) this.contactsScr = "../../../assets/img/sidenav/contacts_white.png";
  }


  /**
   * Handles mouse leave event for menu items by updating corresponding image sources.
   * 
   * @param {number} number - The menu number.
   * @returns {void}
   */
  mouseLeave(number: number): void {
    if (number === 1 && this.data.selectedMenu != 1) this.summaryScr = "../../../assets/img/sidenav/summary.png";
    else if (number === 2 && this.data.selectedMenu != 2) this.addScr = "../../../assets/img/sidenav/add_task.png";
    else if (number === 3 && this.data.selectedMenu != 3) this.boardScr = "../../../assets/img/sidenav/board.png";
    else if (number === 4 && this.data.selectedMenu != 4) this.contactsScr = "../../../assets/img/sidenav/contacts.png";
  }


  /**
   * Selects a menu item by updating the selected menu in the data object.
   * 
   * @param {number} menuNo - The menu number to select.
   * @returns {void}
   */
  selectMenu(menuNo: number): void {
    if (this.selectedMenu !== menuNo) {
      this.data.selectedMenu = menuNo;
      this.mouseLeave(1);
      this.mouseLeave(2);
      this.mouseLeave(3);
      this.mouseLeave(4);
    }
    if(this.data.innerWidth <= 1100){
      this.slideOutSidebar= true;
      this.data.shadowView = false;
    }
    this.loadData(menuNo);
  }


  /**
   * Loads data based on the selected menu number.
   * 
   * @param {number} menuNo - The menu number to load data for.
   * @returns {Promise<void>}
   */
  async loadData(menuNo: number): Promise<void> {
    if (menuNo == 2 && this.data.allContacts.length != this.data.assignedToList.length) {
      await this.data.generatedAssignedList();
    }
    if (menuNo == 3 && this.data.taskList.length == 0) {
      await this.data.generateTaskList();
    }
  }


  /**
   * Toggles the visibility of the header submenu.
   * This method toggles the value of the headerSubmenuView property, which controls the visibility of the submenu.
   * 
   * @returns {void}
   */
  toggleHeaderSubmenu(): void {
    this.headerSubmenuView = !this.headerSubmenuView;
  }


  toggleSideNav(): void{
    this.slideOutSidebar=!this.slideOutSidebar;
    if(this.slideOutSidebar){
      this.data.shadowView = false;
    } else {
      this.data.shadowView = true;
    }
  }
}
