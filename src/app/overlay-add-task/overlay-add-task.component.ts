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
    ){
      this.data.generatedAssignedList();
    }


    closeAddTaskPopup(): void{
      this.data.slideOut = true;
      setTimeout(() => {
        this.data.startBoardAddTaskView = false;
        this.data.shadowView = false;
        this.data.slideOut = false;
      }, 1100);
    }
}
