import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubtasksService } from '../services/subtasks.service';
import { PrioBtnService } from '../services/prio-btn.service';
import { AssignedToService } from '../services/assigned-to.service';

@Component({
  selector: 'app-overlay-edit-task',
  templateUrl: './overlay-edit-task.component.html',
  styleUrl: './overlay-edit-task.component.scss'
})
export class OverlayEditTaskComponent {
  taskCard: Task = new Task();
  editForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.selectedTask['title'], [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    description: new FormControl(this.data.selectedTask['description'], []),
    assignTo: new FormControl('Select contacts to assign', []),
    assignToSelect: new FormControl('', []),
    dueDate: new FormControl(this.data.selectedTask['due_date'], [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    subtask: new FormControl('', []),
    subListItem: new FormControl(),
  });


  constructor(
    public data: DataService,
    private auth: AuthService,
    public subtaskService: SubtasksService,
    public prioBtnService: PrioBtnService,
    public assignedToService: AssignedToService
  ) {
    this.subtaskService.subtasksList = [];
    this.assignedToService.resetAssignTo();
    this.taskCard.setTaskCardData(this.data.selectedTask);
    this.prioBtnService.selectPrioBtn(this.data.selectedTask['prio'])
    this.setAssignedToList();
    this.subtaskService.subtasksList = JSON.parse(JSON.stringify(this.data.selectedTask['subtask']));
    this.subtaskService.activeForm = this.editForm;
  }


  /**
   * Sets the status of assigned contacts based on users found in `taskCard.assignTo`.
   * 
   * @returns {void}
   */
  setAssignedToList(): void {
    let list = this.data.assignedToList;
    this.taskCard.assignTo.forEach(assigned => {
      let userId = assigned.id_user;
      let foundIndex = list.findIndex(contact => contact.id_user === userId);
      if (foundIndex != -1) this.data.assignedToList[foundIndex].checked = true;
    });
  }


  /**
   * Closes the task edit view.
   * 
   * @returns {void}
   */
  closeTaskEditView(): void {
    this.data.slideOut = true;
      setTimeout(() => {
        this.data.startEditTaskView  = false;
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
    console.log(response);
  }


  /**
   * Deletes the current task.
   * 
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async deleteTask(): Promise<void> {
    this.closeTaskEditView();
    const response = await this.auth.deleteTask(this.taskCard.id);
    console.log(response);
    if (response.message == 'Task deleted successfully') {
      this.data.taskList.splice(this.data.selectedTaskIndex, 1);
    }
  }


  /**
   * Saves the changes made to the task.
   * 
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async saveTaskChanges(): Promise<void> {
    this.editForm.disable();
    this.prioBtnService.isSaving = true;
    await this.editTaskCardData();
    await this.updateTaskList();
    this.closeTaskEditView();
    this.prioBtnService.isSaving = false;
    let response = await this.auth.updateTask(this.taskCard);
    this.startAddTaskDoneView();
    console.log(response);
  }


  /**
   * Edits the task card data based on the form values.
   * 
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async editTaskCardData(): Promise<void> {
    const formData = this.editForm.value;
    this.taskCard.title = formData.title;
    this.taskCard.description = formData.description;
    this.taskCard.dueDate = formData.dueDate;
    this.taskCard.subtask = this.subtaskService.subtasksList;
    this.taskCard.prio = this.prioBtnService.selectedPrioBtn;
    this.taskCard.assignTo = await this.createAssignedToList();
  }


  /**
   * Updates the task list with the edited task card.
   * 
   * @returns {Promise<void>} - A promise indicating the completion of the operation.
   */
  async updateTaskList(): Promise<void> {
    let task = this.taskCard.createTaskListItem();
    this.data.taskList[this.data.selectedTaskIndex] = task;
    this.data.tasksFindingsList[await this.findFindingsListIndex()] = task;
  }


  /**
   * Asynchronously finds the index of a task in the findings list based on its ID.
   * 
   * @returns {Promise<number>} A promise that resolves with the index of the task in the findings list.
   */
  async findFindingsListIndex(): Promise<number> {
    const searchedId = this.data.taskList[this.data.selectedTaskIndex].id;
    let findingsListIndex = this.data.tasksFindingsList.findIndex(task => task.id == searchedId);
    return findingsListIndex;
  }


  /**
   * Creates a list of assigned users based on their checked status.
   * 
   * @returns {Promise<any[]>} - A promise that resolves to an array of assigned users.
   */
  async createAssignedToList(): Promise<any> {
    let assignedList: any[] = [];
    this.data.assignedToList.forEach(user => {
      if (user.checked === true) {
        assignedList.push(user);
      }
    });
    return assignedList;
  }


  /**
   * Starts the view for adding a task with a done message overlay.
   * 
   * @returns {void}
   */
  startAddTaskDoneView(): void {
    this.data.selectedMessageIndex = 4;
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }
}
