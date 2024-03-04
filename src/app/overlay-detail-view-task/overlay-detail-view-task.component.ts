import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-overlay-detail-view-task',
  templateUrl: './overlay-detail-view-task.component.html',
  styleUrl: './overlay-detail-view-task.component.scss'
})
export class OverlayDetailViewTaskComponent {

  taskCard: Task = new Task();


  constructor(private data: DataService, private auth: AuthService) {
    this.taskCard.setTaskCardData(this.data.selectedTask);
   }


  closeTaskDetailView(): void {
    this.data.startDetailTaskView = false;
    this.data.shadowView = false;
  }


  async changeSubtaskCheckbox(subIndex: number): Promise<void> {
    this.taskCard.subtask[subIndex].checked =!this.taskCard.subtask[subIndex].checked;
    this.data.taskList[this.data.selectedTaskIndex].subtask[subIndex].checked = this.taskCard.subtask[subIndex].checked;
    let response = await this.auth.updateTask(this.taskCard);
    console.log(response);
  }

  async deleteTask(): Promise<void> {
    this.closeTaskDetailView();
    const response = await this.auth.deleteTask(this.taskCard.id);
    console.log(response);
    if (response.message == 'Task deleted successfully'){
      this.data.taskList.splice(this.data.selectedTaskIndex, 1);
    }
  }


  startEditTaskView(): void {
    this.data.startDetailTaskView = false;
    this.data.startEditTaskView = true;
  }
}
