import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';

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
    private auth: AuthService
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
    console.log(response);
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





  // counter: number = 0;

  // toDoElements: any = [];
  // toDoElementsId: any = [];
  // toDoElementOffsetWidth: number = 0;
  // taskContainerWidth: number = 0;


  // progressElements: any = [];
  // progressElementsId: any = [];

  // progressElementOffsetWidth: number = 0;

  // Neuer Versuch
  toDoCounter: number = 0;
  progressCounter: number = 0;
  feedbackCounter: number = 0;
  doneCounter: number = 0;
  selectedScrollElements: any = [];
  selectedScrollElementsId: any = [];
  selectedClassOffsetWidth: number = 0;
  selectedTaskContainerWidth: number = 0;

  async scrollRight(selectedClass: string, index: number) {
    console.log("scrollRight");
    await this.getAllSelectedElements(selectedClass);
    await this.getAllElementsId();
    if (this.selectedScrollElementsId.length > 0) {
      await this.getSelectedClassOffsetWidth();
      await this.getSelectedTaskContainerWidth(index);
      if (index == 0) this.scrollToDoRight();
      if (index == 1) this.scrollProgressRight();
      if (index == 2) this.scrollFeedbackRight();
      if (index == 3) this.scrollDoneRight();
    }

  }

  async scrollLeft(selectedClass: string, index: number) {
    console.log("scrolllLeft");
    await this.getAllSelectedElements(selectedClass);
    await this.getAllElementsId();
    if (this.selectedScrollElementsId.length > 0) {
      await this.getSelectedClassOffsetWidth();
      await this.getSelectedTaskContainerWidth(index);
      if (index == 0) this.scrollToDoLeft();
      if (index == 1) this.scrollProgressLeft();
      if (index == 2) this.scrollFeedbackLeft();
      if (index == 3) this.scrollDoneLeft();
    }

  }


  async getAllSelectedElements(selectedClass: string) {
    this.selectedScrollElements = document.querySelectorAll('.' + selectedClass);
    console.log(this.selectedScrollElements);
  }

  async getAllElementsId() {
    this.selectedScrollElementsId = [];
    this.selectedScrollElements.forEach(element => {
      this.selectedScrollElementsId.push(element.id);
    });
    console.log('elementIds: ' + this.selectedScrollElementsId);
  }

  async getSelectedClassOffsetWidth() {
    this.selectedClassOffsetWidth = this.selectedScrollElements[0]['offsetWidth'] + 20;
    console.log('selectedClassOffsetWidth: ' + this.selectedClassOffsetWidth);
  }

  async getSelectedTaskContainerWidth(index: number) {
    let containerWidth = document.querySelectorAll('.tasksContainer');
    this.selectedTaskContainerWidth = containerWidth[index]['offsetWidth'];
    console.log('taskContainerWidth: ' + this.selectedTaskContainerWidth);
  }

  calculateCounterRight1(tasksAmount: number, counter: number, offsetWidth: number): number {
    let newCounter = 0;
    newCounter += counter + this.getMaxVisualTaskAmount(offsetWidth);
    if (newCounter >= tasksAmount) {
      for (let index = newCounter; index > 0; index--) {
        newCounter--;
        if (newCounter < tasksAmount - 1) {
          index = 0;
        }
      }
    }
    return newCounter;
  }


  getMaxVisualTaskAmount(offsetWidth: number): number {
    return Math.floor(this.selectedTaskContainerWidth / offsetWidth);
  }


  calculateCounterLeft1(tasksAmount: number, counter: number, offsetWidth: number): number {
    let newCounter = 0;
    newCounter = counter - this.getMaxVisualTaskAmount(offsetWidth);
    if (newCounter < 0) {
      for (let index = newCounter; index <= 0; index++) {
        newCounter++;
        if (newCounter >= 0) index = 0;
      }
    }
    return newCounter;
  }


  scrollTo(scrollTo: any) {
    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }


  async scrollToDoRight() {
    this.toDoCounter = this.calculateCounterRight1(this.selectedScrollElementsId.length, this.toDoCounter, this.selectedClassOffsetWidth);
    console.log(this.toDoCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.toDoCounter]);
    this.scrollTo(scrollTo);
  }

  async scrollToDoLeft() {
    this.toDoCounter = this.calculateCounterLeft1(this.selectedScrollElementsId.length, this.toDoCounter, this.selectedClassOffsetWidth);
    console.log(this.toDoCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.toDoCounter]);
    this.scrollTo(scrollTo);
  }


  async scrollProgressRight() {
    this.progressCounter = this.calculateCounterRight1(this.selectedScrollElementsId.length, this.progressCounter, this.selectedClassOffsetWidth);
    console.log(this.progressCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.progressCounter]);
    this.scrollTo(scrollTo);
  }

  async scrollProgressLeft() {
    this.progressCounter = this.calculateCounterLeft1(this.selectedScrollElementsId.length, this.progressCounter, this.selectedClassOffsetWidth);
    console.log(this.progressCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.progressCounter]);
    this.scrollTo(scrollTo);
  }

  scrollFeedbackRight() {
    this.feedbackCounter = this.calculateCounterRight1(this.selectedScrollElementsId.length, this.feedbackCounter, this.selectedClassOffsetWidth);
    console.log(this.feedbackCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.feedbackCounter]);
    this.scrollTo(scrollTo);
  }


  scrollFeedbackLeft() {
    this.feedbackCounter = this.calculateCounterLeft1(this.selectedScrollElementsId.length, this.feedbackCounter, this.selectedClassOffsetWidth);
    console.log(this.feedbackCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.feedbackCounter]);
    this.scrollTo(scrollTo);
  }


  scrollDoneRight() {
    this.doneCounter = this.calculateCounterRight1(this.selectedScrollElementsId.length, this.doneCounter, this.selectedClassOffsetWidth);
    console.log(this.doneCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.doneCounter]);
    this.scrollTo(scrollTo);
  }


  scrollDoneLeft() {
    this.doneCounter = this.calculateCounterLeft1(this.selectedScrollElementsId.length, this.doneCounter, this.selectedClassOffsetWidth);
    console.log(this.doneCounter);
    let scrollTo = document.getElementById(this.selectedScrollElementsId[this.doneCounter]);
    this.scrollTo(scrollTo);
  }
}



