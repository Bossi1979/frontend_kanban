import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-overlay-detail-view-task',
  templateUrl: './overlay-detail-view-task.component.html',
  styleUrl: './overlay-detail-view-task.component.scss'
})
export class OverlayDetailViewTaskComponent {
  taskCard: Task = new Task();
  moveOptionMenuVisual: boolean = false;


  constructor(public data: DataService, private auth: AuthService, private menuService: MenuService) {
    this.taskCard.setTaskCardData(this.data.selectedTask);
  }


  /**
   * Closes the task detail view.
   * 
   * @returns {void}
   */
  closeTaskDetailView(): void {
    this.data.slideOut = true;
    setTimeout(() => {
      this.data.startDetailTaskView = false;
      this.data.shadowView = false;
      this.data.slideOut = false;
    }, 1100);
  }


  /**
   * Changes the status of a subtask checkbox.
   * 
   * @param {number} subIndex - The index of the subtask.
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async changeSubtaskCheckbox(subIndex: number): Promise<void> {
    this.taskCard.subtask[subIndex].checked = !this.taskCard.subtask[subIndex].checked;
    this.data.taskList[this.data.selectedTaskIndex].subtask[subIndex].checked = this.taskCard.subtask[subIndex].checked;
    let response = await this.auth.updateTask(this.taskCard);
  }


  /**
   * Deletes the current task.
   * 
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async deleteTask(): Promise<void> {
    this.closeTaskDetailView();
    this.startDeleteDoneView();
    const response = await this.auth.deleteTask(this.taskCard.id);
    if (response.message == 'Task deleted successfully') {
      this.data.taskList.splice(this.data.selectedTaskIndex, 1);
    }
  }


  /**
   * Starts the edit task view and closes the detail task view.
   * 
   * @returns {void}
   */
  startEditTaskView(): void {
    this.data.slideOut = true;
    setTimeout(() => {
      this.data.startDetailTaskView = false;
      this.data.slideOut = false;
      setTimeout(() => {
        this.data.startEditTaskView = true;
      }, 100);
    }, 1100);
  }


  /**
   * Initiates the process of deleting the "Done" view.
   * 
   * @returns {void}
   */
  startDeleteDoneView(): void {
    this.data.selectedMessageIndex = 5;
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }


  /**
   * Toggles the visibility of the move option menu.
   * 
   * @returns {void}
   */
  toggleMoveOptionMenu(): void{
    this.moveOptionMenuVisual =!this.moveOptionMenuVisual;
  }


  /**
   * Changes the processing status of the task.
   * 
   * @param processingStatus The new processing status to set.
   * @returns A Promise that resolves when the processing status is updated.
   */
  async changeProcessingStatus(processingStatus: number): Promise<void> {
    this.taskCard.processingStatus = processingStatus;
    this.data.taskList[this.data.selectedTaskIndex].processing_status = processingStatus;
    let response = await this.auth.updateTask(this.taskCard);
    this.moveOptionMenuVisual = false;
    this.closeTaskDetailView();
    this.startEditDoneView();
  }


  /**
   * Starts the view for adding a task with a done message overlay.
   * 
   * @returns {void}
   */
  startEditDoneView(): void {
    this.data.selectedMessageIndex = 4;
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }
}
