import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
// import { AssignedToService } from '../services/assigned-to.service';
// import { PrioBtnService } from '../services/prio-btn.service';
// import { AddTaskService } from '../services/add-task.service';
// import { SubtasksService } from '../services/subtasks.service';
// import { AuthService } from '../services/auth.service';
// import { Task } from '../models/task.model';

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
      this.data.startBoardAddTaskView = false;
      this.data.shadowView = false;
    }
}
