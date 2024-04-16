import { Injectable, HostListener, } from '@angular/core';
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
  assignedToList: any[] = [];
  taskList: any[] = [];
  tasksFindingsList: any[] = [];
  shadowView: boolean = false;
  startAddContactView: boolean = false;
  messageOverlayView: boolean = false;
  addContactDoneView: boolean = false;
  startEditContactView: boolean = false;
  selectedContact: number = -1;
  startDetailTaskView: boolean = false;
  startEditTaskView: boolean = false;
  startBoardAddTaskView: boolean = false;
  selectedTaskIndex: number;
  selectedTask: any[];
  taskCard: Task = new Task();
  selectedMessageIndex: number = 1;
  slideOut: boolean = false;
  greetingDone: boolean = false;
  innerWidth: number;
  userBackgroundColor: string = '#000000';


  constructor(
    private as: AuthService,
  ) {
    if (localStorage.getItem('userData')) {
      this.loggedUserData = JSON.parse(localStorage.getItem('userData'));
      this.loadDatas();
    }
  }


  /**
   * Loads data by retrieving contacts, generating assigned list, and generating task list.
   * 
   * @returns A Promise that resolves when data loading is complete.
   */
  async loadDatas() {
    await this.getContacts();
    await this.generatedAssignedList();
    await this.generateTaskList();
  }


  /**
   * Sets the logged user's data.
   * 
   * @returns A Promise that resolves when the logged user's data is set.
   */
  async setLoggedUserData(): Promise<void> {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const nameAbbreviation = firstname[0] + lastname[0];
    const id = +localStorage.getItem('id');
    const json = this.createJsonLoggedUserData(username, email, firstname, lastname, nameAbbreviation, id);
    this.loggedUserData[0] = json;
    localStorage.setItem('userData', JSON.stringify(this.loggedUserData));
  }


  /**
   * Creates JSON object for the logged user's data.
   * 
   * @param username The username of the logged user.
   * @param email The email of the logged user.
   * @param firstname The firstname of the logged user.
   * @param lastname The lastname of the logged user.
   * @param nameAbbreviation The abbreviation of the logged user's name.
   * @param id The ID of the logged user.
   * @returns JSON object for the logged user's data.
   */
  createJsonLoggedUserData(username: string, email: string, firstname: string, lastname: string, nameAbbreviation: string, id: number): any {
    const json = {
      "username": username,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "nameAbbreviation": nameAbbreviation,
      'id': id,
    }
    return json;
  }


  /**
   * Retrieves all contacts.
   * 
   * @returns A Promise that resolves when all contacts are retrieved.
   */
  async getContacts(): Promise<void> {
    const response: any = await this.as.getAllContacts();
    this.allContacts = response;
    this.setUserBackgroundColor();
  }


  /**
   * Sets the background color for the logged user based on their contact data.
   * 
   * @returns <void>
   */
  setUserBackgroundColor(): void {
    const searchedId = this.loggedUserData[0].id
    const contactIndex = this.allContacts.findIndex(contact => contact.id_user == searchedId);
    if (contactIndex >= 0) {
      this.userBackgroundColor = this.allContacts[contactIndex].background_color;
    }
    console.log('contact Index: ', contactIndex)
  }


  /**
   * Generates the assigned list for tasks.
   * 
   * @returns A Promise that resolves when the assigned list is generated.
   */
  async generatedAssignedList(): Promise<void> {
    this.assignedToList = this.allContacts.slice();
    console.log('assigned to list: ', this.assignedToList);
  }


  /**
   * Generates the task list.
   * 
   * @returns A Promise that resolves when the task list is generated.
   */
  async generateTaskList(): Promise<void> {
    const response: any = await this.as.getAllTasks();
    this.taskList = response;
  }


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
