import { Component, ElementRef, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AddTaskService } from '../services/add-task.service';
import { SubtasksService } from '../services/subtasks.service';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  urgentSelected: boolean = false;
  mediumSelected: boolean = false;
  lowSelected: boolean = false;
  selectedPrioBtn: number = 0;
  assignBtnDisabled = true;
  isSaving: boolean = false;
  categoryDropdown: boolean = false;
  @ViewChild('subtaskInput') subtaskInput!: ElementRef;
  

  constructor(
    public data: DataService,
    private as: AuthService,
    public addTaskService: AddTaskService,
    public subtaskService: SubtasksService,
  ) {
    this.subtaskService.subtasksList = [];
   }


  /**
   * Selects the priority and updates the selection accordingly.
   * 
   * @param {number} prio - The priority to be selected.
   */
  selectedPrio(prio: number) {
    if (!this.isSaving) {
      if (this.prioBtnHasToBeDisabled(prio)) this.disablePrioBtn(prio);
      else this.selectPrioBtn(prio);
    }
  }


  /**
   * Checks whether the priority button should be disabled based on the selected priority.
   * 
   * @param {number} prio - The priority to be checked against the selected priority button.
   * @returns {boolean} - Returns true if the priority button should be disabled, otherwise false.
   */
  prioBtnHasToBeDisabled(prio: number): boolean {
    return prio == this.selectedPrioBtn;
  }



  /**
    * Disables the button for the specified priority.
    * 
    * @param {number} prio - The priority for which the button should be disabled.
    */
  disablePrioBtn(prio: number): void {
    if (prio == 1) this.urgentSelected = !this.urgentSelected;
    if (prio == 2) this.mediumSelected = !this.mediumSelected;
    if (prio == 3) this.lowSelected = !this.lowSelected;
    this.selectedPrioBtn = 0;
  }


  /**
   * Selects the button for the specified priority.
   * 
   * @param {number} prio - The priority to be selected.
   */
  selectPrioBtn(prio: number): void {
    this.resetPrio();
    if (prio == 1) this.urgentSelected = true;
    if (prio == 2) this.mediumSelected = true;
    if (prio == 3) this.lowSelected = true;
    this.selectedPrioBtn = prio;
  }


  /**
   * Resets all priorities to their initial state.
   */
  resetPrio(): void {
    this.urgentSelected = false;
    this.mediumSelected = false;
    this.lowSelected = false;
    this.selectedPrioBtn = 0;
  }


  /**
   * Opens the dropdown menu for assignment if not disabled.
   */
  openAssignToDropdown(): void {
    if (this.assignBtnDisabled) this.assignBtnDisabled = false;
  }


  /**
   * Toggles the assignment dropdown menu if not in saving mode.
   */
  toggleAssignToDropdown(): void {
    if (!this.isSaving) this.assignBtnDisabled = !this.assignBtnDisabled;
  }


  /**
   * Handles the selection of a checkbox by updating its status based on user assignment.
   * 
   * @param {string} id - The ID of the checkbox.
   * @param {number} index - The index of the checkbox in the assignedToList array.
   */
  selectionCheckbox(id: string, index: number): void {
    if (this.userIsAssignedTo(id) && this.userNotListedAsAssignedTo(index)) this.data.assignedToList[index].checked = true;
    else if (this.userListedAsAssignedTo(index)) this.data.assignedToList[index].checked = false;
  }


  /**
   * Checks if a user is assigned to a checkbox.
   * 
   * @param {string} id - The ID of the checkbox.
   * @returns {boolean} - Returns true if the user is assigned to the checkbox, otherwise false.
   */
  userIsAssignedTo(id: string): boolean {
    const selectedCheckbox = document.getElementById(id) as HTMLInputElement;
    const assignedStatus = selectedCheckbox.checked;
    return assignedStatus;
  }


  /**
   * Checks if a user is not listed as assigned to a checkbox.
   * 
   * @param {number} index - The index of the checkbox in the assignedToList array.
   * @returns {boolean} - Returns true if the user is not listed as assigned to the checkbox, otherwise false.
   */
  userNotListedAsAssignedTo(index: number): boolean {
    return !this.data.assignedToList[index].checked
  }


  /**
   * Checks if a user is listed as assigned to a checkbox.
   * 
   * @param {number} index - The index of the checkbox in the assignedToList array.
   * @returns {boolean} - Returns true if the user is listed as assigned to the checkbox, otherwise false.
   */
  userListedAsAssignedTo(index: number): boolean {
    return this.data.assignedToList[index].checked;
  }


  /**
   * Asynchronously creates a task, handles the saving process, and clears the form afterwards.
   * 
   * @returns {Promise<void>} - A Promise that resolves once the task creation process is complete.
   */
  async createTask(): Promise<void> {
    this.isSaving = true;
    this.addTaskService.addForm.disable();
    await this.saveTask();
    this.clearForm();
    this.isSaving = false;
    this.addTaskService.addForm.enable();
  }


  /**
   * Clears the form by resetting priority, form values, and assigned contacts.
   */
  clearForm(): void {
    this.resetPrio();
    this.addTaskService.addForm.reset();
    this.resetAssignTo();
    this.subtaskService.subtasksList = [];
  }


  /**
   * Resets the assigned contacts to their initial state and disables the assignment button.
   */
  resetAssignTo(): void {
    this.assignBtnDisabled = true;
    this.addTaskService.addForm.get('assignTo').setValue('Select contacts to assign');
    this.data.assignedToList.forEach(contact => {
      contact.checked = false;
    });
  }


  /**
   * Asynchronously saves the task by creating task data for saving and logging it.
   * 
   * @returns {Promise<void>} - A Promise that resolves once the task data is saved.
   */
  async saveTask(): Promise<void> {
    const taskData: any = await this.createTaskDataForSave();
    let response = await this.as.saveTask(taskData);
    await this.data.generateTaskList();
  }


  /**
   * Asynchronously creates task data for saving based on the form values and assigned contacts.
   * 
   * @returns {Promise<any>} - A Promise that resolves with the task data for saving.
   */
  async createTaskDataForSave(): Promise<any> {
    let task: Task = new Task();
    task.title = this.addTaskService.addForm.get('title').value;
    task.description = this.addTaskService.addForm.get('description').value;
    task.assignTo = await this.createAssignToForSave();
    task.dueDate = this.addTaskService.addForm.get('dueDate').value;
    task.category = this.addTaskService.addForm.get('category').value;
    task.subtask = this.subtaskService.subtasksList;
    task.prio = this.selectedPrioBtn;
    return task.createTaskObject();
  }


  /**
   * Asynchronously creates the list of assigned contacts for saving.
   * 
   * @returns {Promise<any>} - A Promise that resolves with the list of assigned contacts for saving.
   */
  async createAssignToForSave(): Promise<any> {
    let toSaveAssigned: any[] = [];
    this.data.assignedToList.forEach(contact => {
      if (this.contactMarkedAsAssignedTo(contact.checked)) toSaveAssigned.push(contact);
    });
    return toSaveAssigned;
  }


  /**
   * Checks if a contact is marked as assigned to the task.
   * 
   * @param {boolean} assignedToStatus - The assigned status of the contact.
   * @returns {boolean} - Returns true if the contact is marked as assigned, otherwise false.
   */
  contactMarkedAsAssignedTo(assignedToStatus: boolean): boolean {
    return assignedToStatus;
  }


  /**
   * Toggles the category dropdown state.
   * 
   * @returns {void}
   */
  toogleCategoryDropdown(): void {
    this.categoryDropdown = !this.categoryDropdown;
    if (!this.categoryDropdown) this.addTaskService.addForm.get('category').enable();
    else this.addTaskService.addForm.get('category').disable();
  }


  /**
   * Sets the category value and toggles the category dropdown state.
   * @param {string} category - The category to set.
   * 
   * @returns {void}
   */
  setCategory(category: string): void {
    this.addTaskService.addForm.get('category').setValue(category);
    this.toogleCategoryDropdown();
  }
  

  /**
   * Activates subtask editing by focusing on the subtask input element.
   * This method triggers the 'activatedSubtaskEdit' method of the subtask service
   * and focuses on the native subtask input element.
   * 
   * @returns {void}
   */
  activatedSubtaskEdit(): void {
    this.subtaskService.activatedSubtaskEdit();
    this.subtaskInput.nativeElement.focus();
  }


  /**
   * Closes the add subtask mode.
   * 
   * @returns {void}
   */
  closeAddSubtask(): void {
    this.subtaskService.closeAddSubtask();
    this.subtaskInput.nativeElement.blur();
  }
}






