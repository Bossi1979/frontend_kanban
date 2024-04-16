import { Injectable, HostListener } from '@angular/core';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedMenu: number = 0;
  loggedUserData: any[] = [];
  allContacts: any[] = [];
  allContacts$: any = [];

  // Varialblen für AddTask
  assignedToList: any[] = [];
  taskList: any[] = [];
  tasksFindingsList: any[] = [];

  //contacts Variablen
  shadowView: boolean = false;
  startAddContactView: boolean = false;
  messageOverlayView: boolean = false;
  addContactDoneView: boolean = false;
  startEditContactView: boolean = false;
  selectedContact: number = -1;

  // board Variablen
  startDetailTaskView: boolean = false;
  startEditTaskView: boolean = false;
  startBoardAddTaskView: boolean = false;
  selectedTaskIndex: number;
  selectedTask: any[];
  taskCard: Task = new Task();

  //overlay
  selectedMessageIndex: number = 1;
  slideOut: boolean = false;
  greetingDone: boolean = false;

  innerWidth: number;


  constructor(
    private as: AuthService
  ) {
    if (localStorage.getItem('userData')) {
      this.loggedUserData = JSON.parse(localStorage.getItem('userData'));
      this.loadDatas();
    }
  }


  async loadDatas() {
    await this.getContacts();
    await this.generatedAssignedList();
    await this.generateTaskList();
  }


  async setLoggedUserData(): Promise<void> {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const nameAbbreviation = firstname[0] + lastname[0];
    const id = localStorage.getItem('id');
    const json = {
      "username": username,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "nameAbbreviation": nameAbbreviation,
      'id': id,
    }
    this.loggedUserData[0] = json;
    localStorage.setItem('userData', JSON.stringify(this.loggedUserData));
  }


  async getContacts(): Promise<void> {
    const response: any = await this.as.getAllContacts();
    this.allContacts = response;
    this.setUserBackgroundColor();
  }


  userBackgroundColor: string = '#000000';

  setUserBackgroundColor(): void {
    const searchedId = this.loggedUserData[0].id
    const contactIndex = this.allContacts.findIndex(contact => contact.id_user == searchedId);
    if (contactIndex >= 0) {
      this.userBackgroundColor = this.allContacts[contactIndex].background_color;
    }
    console.log('contact Index: ', contactIndex)
  }


  // für AddTask

  async generatedAssignedList(): Promise<void> {
    this.assignedToList = this.allContacts.slice();
    console.log('assigned to list: ', this.assignedToList);
  }


  async generateTaskList(): Promise<void> {
    const response: any = await this.as.getAllTasks();
    this.taskList = response;
  }



  // Für Summary und Board
  
  /**
   * Counts the number of tasks that are still to be done.
   * 
   * @returns {number} The number of tasks that are still to be done.
   */
  counterToDo(): number {
    let counter = 0;
    this.taskList.forEach(task => {
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
    this.taskList.forEach(task => {
      if (task.processing_status === 3) counter++;
    });
    return counter;
  }



  /**
   * Counts the number of tasks that are in progress.
   * 
   * @returns {number} The number of tasks that are in progress.
   */
  countertaskInProgress(): number {
    let counter: number = 0;
    this.taskList.forEach(task => {
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
    this.taskList.forEach(task => {
      if (task.processing_status === 2) counter++;
    });
    return counter;
  }
}
