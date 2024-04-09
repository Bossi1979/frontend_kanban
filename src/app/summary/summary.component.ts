import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  toDoEntered: boolean = false;
  doneEntered: boolean = false;
  greeting: string;
  upcommingDeadline: string = 'None';
  toDoAmount: number = 0;
  toDoUrgentAmount: number = 0;
  progressAmount: number = 0;
  awaitingAmount: number = 0;
  doneAmount: number = 0;
  taskAmount: number = 0;
  deadlineReached: boolean = false;
  mounthArray: string[] = [
    "unset",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];


  constructor(
    public data: DataService,
    private menuService: MenuService
  ) {
    this.generateData();
  }


  /**
   * Asynchronously generates data for the application.
   * 
   * @returns {Promise<void>} A Promise that resolves when data generation is complete.
   */
  async generateData(): Promise<void> {
    await this.data.generateTaskList();
    await this.determineTheTimeOfDay();
    await this.upcomingDeadline();
    this.setTasksAmounts();
  }


  /**
   * Sets the amounts of various types of tasks.
   * 
   * @returns {void} This function does not return anything.
   */
  setTasksAmounts(): void {
    this.toDoAmount = this.counterToDo();
    this.toDoUrgentAmount = this.counterToDoUrgent();
    this.doneAmount = this.counterDone();
    this.progressAmount = this.countertaskInProgress();
    this.awaitingAmount = this.countertaskAwaitingFeedback();
    this.taskAmount = this.countertaskInBoard();
  }


  
  /**
   * Counts the number of tasks that are still to be done.
   * @returns {number} The number of tasks that are still to be done.
   */
  counterToDo(): number {
    let counter = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 0) counter++;
    });
    return counter;
  }


  /**
   * Counts the number of tasks that are done.
   * 
   * @returns {number} The number of tasks that are done.
   */
  counterDone(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 3) counter++;
    });
    return counter;
  }


  /**
   * Counts the number of urgent tasks that are still to be done.
   * 
   * @returns {number} The number of urgent tasks that are still to be done.
   */
  counterToDoUrgent(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 0 && task.prio === 1) counter++;
    });
    return counter;
  }


  /**
   * Counts the number of tasks currently in the board.
   * 
   * @returns {number} The number of tasks currently in the board.
   */
  countertaskInBoard(): number {
    return this.data.taskList.length;
  }


  /**
   * Counts the number of tasks that are in progress.
   * 
   * @returns {number} The number of tasks that are in progress.
   */
  countertaskInProgress(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 1) counter++;
    });
    return counter;
  }


  /**
   * Counts the number of tasks awaiting feedback.
   * 
   * @returns {number} The number of tasks awaiting feedback.
   */
  countertaskAwaitingFeedback(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 2) counter++;
    });
    return counter;
  }


  /**
   * Sorts the task list by due date.
   * 
   * @returns {object[]} An ordered array of tasks sorted by due date.
   */
  sortDataByDueDate(): any[] {
    let orderedList = this.data.taskList.sort((a, b) => {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
    return orderedList;
  }


  /**
   * Asynchronously determines the upcoming deadline.
   * 
   * @returns {Promise<void>} A Promise that resolves when the upcoming deadline is determined.
   */
  async upcomingDeadline(): Promise<void> {
    if (this.data.taskList.length > 0) {
      this.sortDataByDueDate();
      const deadLineIndex = this.findUpcomingDeadlineIndex();
      if (this.upcomingDeadlineIndexFound(deadLineIndex)) this.createUpcomingDeadLineString(deadLineIndex);
      else this.upcommingDeadline = 'None';
    } else this.upcommingDeadline = 'None';
  }


  /**
   * Checks if the upcoming deadline index is found.
   * 
   * @param {number} deadLineIndex - The index of the upcoming deadline.
   * @returns {boolean} True if the upcoming deadline index is found, otherwise false.
   */
  upcomingDeadlineIndexFound(deadLineIndex: number): boolean {
    return deadLineIndex != -1;
  }


  /**
   * Creates a string representation of the upcoming deadline.
   * @param {number} deadLineIndex - The index of the upcoming deadline.
   * 
   * @returns {void} This function does not return anything.
   */
  createUpcomingDeadLineString(deadLineIndex: number): void {
    const deadline: string = this.data.taskList[deadLineIndex].due_date;
    const day: string = deadline.substring(8, 10);
    const mounthIndex: number = +deadline.substring(5, 7);
    const mounth: string = this.mounthArray[mounthIndex];
    const year: string = deadline.substring(0, 4);
    this.upcommingDeadline = mounth + ' ' + day + ', ' + year;
    this.checkDeadlineReached(deadline);
  }


  /**
   * Finds the index of the upcoming deadline.
   * 
   * @returns {number} The index of the upcoming deadline.
   */
  findUpcomingDeadlineIndex(): number {
    const foundIndex = this.data.taskList.findIndex(task => task.processing_status != 3);
    return foundIndex;
  }


  /**
   * Checks if the deadline is reached.
   * @param {string} deadline - The deadline date.
   * 
   * @returns {void} This function does not return anything.
   */
  checkDeadlineReached(deadline: string): void {
    const dealineDateNumber: number = new Date(deadline).getTime();
    const actualDateNumber: number = new Date().getTime();
    const difference: number = actualDateNumber - dealineDateNumber;
    if (difference <= 0) this.deadlineReached = false;
    else this.deadlineReached = true;
  }


  /**
   * Asynchronously navigates to the board.
   * Generates task list if it's empty and then navigates to the board.
   * 
   * @returns {Promise<void>} A Promise that resolves when navigation is complete.
   */
  async goToBoard(): Promise<void> {
    if (this.data.taskList.length == 0) await this.data.generateTaskList();
    this.menuService.mouseEnter(3);
    this.menuService.selectMenu(3);
  }


  /**
   * Asynchronously determines the time of day and sets a greeting message accordingly.
   * 
   * @returns {Promise<void>} A Promise that resolves when the time of day is determined.
   */
  async determineTheTimeOfDay(): Promise<void> {
    const actualDate: Date = new Date();
    const actualTimeHours: number = actualDate.getHours();
    if (actualTimeHours >= 5 && actualTimeHours < 11) this.greeting = 'Good morning,';
    else if (actualTimeHours >= 11 && actualTimeHours < 18) this.greeting = 'Good afternoon,';
    else if (actualTimeHours >= 18 && actualTimeHours < 22) this.greeting = 'Good evening,';
    else this.greeting = 'Welcome,';
  }
}
