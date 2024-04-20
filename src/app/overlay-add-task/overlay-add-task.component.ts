import { Component } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-overlay-add-task',
  templateUrl: './overlay-add-task.component.html',
  styleUrl: './overlay-add-task.component.scss'
})
export class OverlayAddTaskComponent {


  constructor(
    public data: DataService,
  ) {
    this.data.generatedAssignedList();
  }


  /**
   * Closes the add task popup by setting slideOut to true, then after a delay of 1100 milliseconds,
   * sets startBoardAddTaskView, shadowView, and slideOut to false to hide the popup.
   * 
   * @returns {void}
   */
  closeAddTaskPopup(): void {
    this.data.slideOut = true;
    setTimeout(() => {
      this.data.startBoardAddTaskView = false;
      this.data.shadowView = false;
      this.data.slideOut = false;
    }, 1100);
  }
}
