import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-overlay-edit-task',
  templateUrl: './overlay-edit-task.component.html',
  styleUrl: './overlay-edit-task.component.scss'
})
export class OverlayEditTaskComponent {

  taskCard: Task = new Task();


  constructor(private data: DataService, private auth: AuthService) {
    this.taskCard.setTaskCardData(this.data.selectedTask);
   }


  closeTaskEditView(): void {
    this.data.startEditTaskView = false;
    this.data.shadowView = false;
  }


  async changeSubtaskCheckbox(subIndex: number): Promise<void> {
    this.taskCard.subtask[subIndex].checked =!this.taskCard.subtask[subIndex].checked;
    this.data.taskList[this.data.selectedTaskIndex].subtask[subIndex].checked = this.taskCard.subtask[subIndex].checked;
    let response = await this.auth.updateTask(this.taskCard);
    console.log(response);
  }

}
