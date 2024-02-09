import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-join-sidenav',
  templateUrl: './join-sidenav.component.html',
  styleUrl: './join-sidenav.component.scss'
})
export class JoinSidenavComponent {
  summaryScr: string = "../../../assets/sidenav/summary.png";
  addScr: string = "../../../assets/sidenav/add_task.png";
  boardScr: string = "../../../assets/sidenav/board.png";
  contactsScr: string = "../../../assets/sidenav/contacts.png";
  selectedMenu: number = 0;


  constructor(public data: DataService){}


  mouseEnter(number: number): void {
    if (number === 1 && this.data.selectedMenu != 1) this.summaryScr = "../../../assets/sidenav/summary_white.png";
    else if (number === 2 && this.data.selectedMenu != 2) this.addScr = "../../../assets/sidenav/add_task_white.png";
    else if (number === 3 && this.data.selectedMenu != 3) this.boardScr = "../../../assets/sidenav/board_white.png";
    else if (number === 4 && this.data.selectedMenu != 4) this.contactsScr = "../../../assets/sidenav/contacts_white.png";
  }

  mouseLeave(number: number): void {
    if (number === 1 && this.data.selectedMenu != 1) this.summaryScr = "../../../assets/sidenav/summary.png";
    else if (number === 2 && this.data.selectedMenu != 2) this.addScr = "../../../assets/sidenav/add_task.png";
    else if (number === 3 && this.data.selectedMenu != 3) this.boardScr = "../../../assets/sidenav/board.png";
    else if (number === 4 && this.data.selectedMenu != 4) this.contactsScr = "../../../assets/sidenav/contacts.png";
  }

  selectMenu(menuNo: number): void {
    if (this.selectedMenu !== menuNo){
      this.data.selectedMenu = menuNo;
      this.mouseLeave(1);
      this.mouseLeave(2);
      this.mouseLeave(3);
      this.mouseLeave(4);
    } 
    console.log(this.data.selectedMenu);
  }


}