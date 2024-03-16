import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { SubtasksService } from '../services/subtasks.service';
import { Task } from '../models/task.model';
import { PrioBtnService } from '../services/prio-btn.service';
import { AssignedToService } from '../services/assigned-to.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  categoryDropdown: boolean = false;
  @ViewChild('subtaskInput') subtaskInput!: ElementRef;
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    description: new FormControl('', [
      Validators.maxLength(1000)
    ]),
    assignTo: new FormControl('Select contacts to assign', []),
    assignToSelect: new FormControl('', []),
    dueDate: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(14),
    ]),
    subtask: new FormControl('', []),
    subListItem: new FormControl(),
  });


  constructor(
    public data: DataService,
    private as: AuthService,
    public subtaskService: SubtasksService,
    public prioBtnService: PrioBtnService,
    public assignedToService: AssignedToService,
  ) {
    this.subtaskService.subtasksList = [];
    this.subtaskService.activeForm = this.addForm;
    this.prioBtnService.resetPrio();
    this. resetAssignTo();
  }


  /**
   * Asynchronously creates a task, handles the saving process, and clears the form afterwards.
   * 
   * @returns {Promise<void>} - A Promise that resolves once the task creation process is complete.
   */
  async createTask(): Promise<void> {
    this.prioBtnService.isSaving = true;
    this.addForm.disable();
    await this.saveTask();
    this.clearForm();
    this.prioBtnService.isSaving = false;
    this.addForm.enable();
  }


  /**
   * Clears the add task form and associated data.
   * Resets priority buttons, add task form, assigned to field, subtasks list, and text fields in the form.
   * 
   * @returns {void} This function does not return anything.
   */
  clearForm(): void {
    this.prioBtnService.resetPrio();
    this.addForm.reset();
    this.resetAssignTo();
    this.subtaskService.subtasksList = [];
    this.resetTextFieldsInForm();
  }


  /**
   * Resets the text fields in the add task form.
   * Clears the title and description fields in the add task form.
   * 
   * @returns {void} This function does not return anything.
   */
  resetTextFieldsInForm(): void {
    this.addForm.get('title').setValue('');
    this.addForm.get('description').setValue('');
  }


  /**
   * Resets the assigned contacts to their initial state and disables the assignment button.
   */
  resetAssignTo(): void {
    this.assignedToService.assignBtnDisabled = true;
    this.addForm.get('assignTo').setValue('Select contacts to assign');
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
    console.log(response);
    if (this.data.selectedMenu == 2) {
      await this.data.generateTaskList();
      this.data.tasksFindingsList = this.data.taskList.slice();
      this.startAddTaskDoneView();
    } else if (this.data.selectedMenu == 3) {
      this.closeAddTaskPopup();
      this.startAddTaskDoneView();
      await this.data.generateTaskList();
      this.data.tasksFindingsList = this.data.taskList.slice();
    }
  }


  /**
   * Closes the add task popup window.
   * Sets the startBoardAddTaskView and shadowView properties to false to hide the add task popup and shadow overlay.
   * 
   * @returns {void} This function does not return anything.
   */
  closeAddTaskPopup(): void {
    this.data.slideOut = true;
      setTimeout(() => {
        this.data.startBoardAddTaskView = false;
        this.data.shadowView = false;
        this.data.slideOut = false;
      }, 1100);
  }


  /**
   * Asynchronously creates task data for saving based on the form values and assigned contacts.
   * 
   * @returns {Promise<any>} - A Promise that resolves with the task data for saving.
   */
  async createTaskDataForSave(): Promise<any> {
    let task: Task = new Task();
    task.title = this.addForm.get('title').value;
    task.description = this.addForm.get('description').value;
    task.assignTo = await this.createAssignToForSave();
    task.dueDate = this.addForm.get('dueDate').value;
    task.category = this.addForm.get('category').value;
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
    if (!this.categoryDropdown) this.addForm.get('category').enable();
    else this.addForm.get('category').disable();
  }


  /**
   * Sets the category value and toggles the category dropdown state.
   * @param {string} category - The category to set.
   * 
   * @returns {void}
   */
  setCategory(category: string): void {
    this.addForm.get('category').setValue(category);
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


  /**
   * Starts the view for adding a task with a done message overlay.
   * 
   * @returns {void}
   */
  startAddTaskDoneView(): void {
    this.data.selectedMessageIndex = 3;
    this.data.messageOverlayView = true;
    this.data.addContactDoneView = true;
    setTimeout(() => {
      this.data.addContactDoneView = false;
      this.data.messageOverlayView = false;
    }, 2600);
  }
}






