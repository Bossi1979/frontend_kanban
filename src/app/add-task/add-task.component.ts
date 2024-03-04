import { Component, ElementRef, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AddTaskService } from '../services/add-task.service';
import { SubtasksService } from '../services/subtasks.service';
import { Task } from '../models/task.model';
import { PrioBtnService } from '../services/prio-btn.service';
import { AssignedToService } from '../services/assigned-to.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  categoryDropdown: boolean = false;
  @ViewChild('subtaskInput') subtaskInput!: ElementRef;
  

  constructor(
    public data: DataService,
    private as: AuthService,
    public addTaskService: AddTaskService,
    public subtaskService: SubtasksService,
    public prioBtnService: PrioBtnService,
    public assignedToService: AssignedToService,
  ) {
    this.subtaskService.subtasksList = [];
    this.subtaskService.activeForm = this.addTaskService.addForm;
    this.prioBtnService.resetPrio();
    console.log(this.subtaskService.activeForm);
   }


  /**
   * Asynchronously creates a task, handles the saving process, and clears the form afterwards.
   * 
   * @returns {Promise<void>} - A Promise that resolves once the task creation process is complete.
   */
  async createTask(): Promise<void> {
    console.log(this.subtaskService.activeForm);
    this.prioBtnService.isSaving = true;
    this.addTaskService.addForm.disable();
    await this.saveTask();
    this.clearForm();
    this.prioBtnService.isSaving = false;
    this.addTaskService.addForm.enable();
  }


  /**
   * Clears the form by resetting priority, form values, and assigned contacts.
   */
  clearForm(): void {
    this.prioBtnService.resetPrio();
    this.addTaskService.addForm.reset();
    this.resetAssignTo();
    this.subtaskService.subtasksList = [];
  }


  /**
   * Resets the assigned contacts to their initial state and disables the assignment button.
   */
  resetAssignTo(): void {
    this.assignedToService.assignBtnDisabled = true;
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
    task.prio = this.prioBtnService.selectedPrioBtn;
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






