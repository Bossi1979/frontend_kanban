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


  /**
   * Closes the task detail view.
   * 
   * @returns {void}
   */
  closeTaskDetailView(): void {
    this.data.startDetailTaskView = false;
    this.data.shadowView = false;
  }


  /**
   * Changes the status of a subtask checkbox.
   * 
   * @param {number} subIndex - The index of the subtask.
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async changeSubtaskCheckbox(subIndex: number): Promise<void> {
    this.taskCard.subtask[subIndex].checked =!this.taskCard.subtask[subIndex].checked;
    this.data.taskList[this.data.selectedTaskIndex].subtask[subIndex].checked = this.taskCard.subtask[subIndex].checked;
    let response = await this.auth.updateTask(this.taskCard);
    console.log(response);
  }


  /**
   * Deletes the current task.
   * 
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async deleteTask(): Promise<void> {
    this.closeTaskDetailView();
    const response = await this.auth.deleteTask(this.taskCard.id);
    console.log(response);
    if (response.message == 'Task deleted successfully'){
      this.data.taskList.splice(this.data.selectedTaskIndex, 1);
    }
  }


  /**
   * Starts the edit task view and closes the detail task view.
   * 
   * @returns {void}
   */
  startEditTaskView(): void {
    this.data.startDetailTaskView = false;
    this.data.startEditTaskView = true;
  }
}
