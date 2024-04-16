import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { ScrollService } from '../services/scroll.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  taskCard: Task = new Task();
  draggedTaskIndex: number;
  highligtedProcessingIndex: number;
  selectedTaskCardIndex: number;
  searchInput: string = '';
  inputDisabled: boolean = false;
  indexNumber: number = 0;


  constructor(
    public data: DataService,
    private auth: AuthService,
    public scroll: ScrollService,
  ) {
    this.data.tasksFindingsList = this.data.taskList.slice();
  }


  /**
   * Counts the number of subtasks that are marked as done for a given task.
   * 
   * @param {number} taskIndex - The index of the task in the task list.
   * @returns {number} The number of subtasks marked as done for the specified task.
   */
  countSubtasksDone(taskIndex: number): number {
    const subtasks: any[] = this.data.taskList[taskIndex].subtask;
    let doneCounter = 0;
    subtasks.forEach(sub => {
      if (this.subTaskDone(sub)) doneCounter++;
    });
    return doneCounter;
  }


  /**
   * Checks if a subtask is marked as done.
   * 
   * @param {Object} sub - The subtask object to check.
   * @returns {boolean} True if the subtask is marked as done, otherwise false.
   */
  subTaskDone(sub: any): boolean {
    return sub.checked == true;
  }


  /**
   * Calculates the width of the done bar for a task based on the percentage of subtasks completed.
   * 
   * @param {number} taskIndex - The index of the task in the task list.
   * @returns {string} The width of the done bar as a percentage string.
   */
  calculateDoneBarWidth(taskIndex: number): string {
    let doneCounter = this.countSubtasksDone(taskIndex);
    let subtaskAmount = this.data.taskList[taskIndex].subtask.length;
    let percentDone = (doneCounter / subtaskAmount) * 100;
    let percentDoneSting = percentDone.toString() + '%';
    return percentDoneSting;
  }


  /**
   * Sets the index of the task being dragged.
   * 
   * @param {number} index - The index of the task being dragged.
   * @returns {void}
   */
  startDragging(index: number): void {
    this.draggedTaskIndex = index;
  }


  /**
   * Handles the drop event when a task is dropped into a drop area.
   * 
   * @param {number} droparea - The index of the drop area where the task is dropped.
   * @returns {Promise<void>} A promise that resolves when the task is dropped.
   */
  async drop(droparea: number): Promise<void> {
    this.highligtedProcessingIndex = -1;
    this.data.taskList[this.draggedTaskIndex].processing_status = droparea;
    this.taskCard.setTaskCardData(this.data.taskList[this.draggedTaskIndex]);
    let response = await this.auth.updateTask(this.taskCard);
  }


  /**
   * Prevents the default action of an event, typically used to allow dropping elements.
   * 
   * @param {Event} event - The event object.
   * @returns {void}
   */
  allowDrop(event: any): void {
    event.preventDefault();
  }


  /**
   * Sets the index of the highlighted drop area to enable visual indication.
   * 
   * @param {number} index - The index of the drop area to highlight.
   * @returns {void}
   */
  enableHigligthedDopArea(index: number): void {
    this.highligtedProcessingIndex = index;
  }


  /**
   * Disables the visual indication of any highlighted drop area.
   * 
   * @returns {void}
   */
  disableHighligthedDopArea(): void {
    this.highligtedProcessingIndex = -1;
  }


  /**
   * Handles the click event on a task card.
   * 
   * @param {number} index - The index of the clicked task card.
   * @returns {void}
   */
  clickTaskCard(index: number): void {
    this.data.selectedTaskIndex = index;
    this.data.selectedTask = this.data.taskList[index];
    this.data.startDetailTaskView = true;
    this.data.shadowView = true;
  }


  /**
   * Finds task cards based on the search input and updates the tasks findings list.
   * 
   * @returns {void}
   */
  findTaskCards(): void {
    this.indexNumber = 0;
    const seachTerm = this.searchInput.trim().toLowerCase();
    this.inputDisabled = true;
    if (seachTerm.length > 0) this.updateFindingsList(seachTerm);
    else this.data.tasksFindingsList = this.data.taskList.slice();
    this.inputDisabled = false;
  }


  /**
   * Update the tasks findings list based on the search term.
   * 
   * @param {string} searchTerm - The search term to match against task titles and descriptions.
   * @returns {void}
   */
  updateFindingsList(seachTerm: string): void {
    this.data.tasksFindingsList = [];
    this.data.taskList.forEach(task => {
      let title = task.title;
      let description = task.description;
      if (title.toLowerCase().includes(seachTerm)) this.data.tasksFindingsList.push(task);
      else if (description.toLowerCase().includes(seachTerm)) this.data.tasksFindingsList.push(task);
      this.indexNumber++;
    });
  }


  /**
   * Opens the add task popup and initializes necessary data.
   * 
   * @returns {void}
   */
  openAddTaskPopup(): void {
    this.data.startBoardAddTaskView = true;
    this.data.shadowView = true;
    this.searchInput = '';
    this.data.tasksFindingsList = this.data.taskList.slice();
  }
}



