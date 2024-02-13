import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


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
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    description: new FormControl('', []),
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
      Validators.maxLength(30)
    ]),
    subtask: new FormControl('', []),
  });


  constructor(
    public data: DataService,
    private as: AuthService,
    ) { }


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
    this.addForm.disable();
    await this.saveTask();
    this.clearForm();
    this.isSaving = false;
    this.addForm.enable();
  }


  /**
   * Clears the form by resetting priority, form values, and assigned contacts.
   */
  clearForm(): void {
    this.resetPrio();
    this.addForm.reset();
    this.resetAssignTo();
    this.subtasksList = [];
  }

  
  /**
   * Resets the assigned contacts to their initial state and disables the assignment button.
   */
  resetAssignTo(): void {
    this.assignBtnDisabled = true;
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
  }


  /**
   * Asynchronously creates task data for saving based on the form values and assigned contacts.
   * 
   * @returns {Promise<any>} - A Promise that resolves with the task data for saving.
   */
  async createTaskDataForSave(): Promise<any> {
    const taskData: any = {
      title: this.addForm.get('title').value,
      description: this.addForm.get('description').value,
      assignTo: await this.createAssignToForSave(),
      dueDate: this.addForm.get('dueDate').value,
      category: this.addForm.get('category').value,
      subtask: this.subtasksList,
      prio: this.selectedPrioBtn,
      processingStatus: 0,
    };
    return taskData;
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


  // category
  categoryDropdown: boolean = false;
  subtaskEdit: boolean = false;
  @ViewChild('subtaskInput') subtaskInput!: ElementRef;
  subtasksList: any[] = [];


  toogleCategoryDropdown(): void {
    this.categoryDropdown =!this.categoryDropdown;
    if (!this.categoryDropdown) this.addForm.get('category').enable();
    else this.addForm.get('category').disable();
  }

  setCategory(category: string): void{
    this.addForm.get('category').setValue(category);
    this.toogleCategoryDropdown();
  }

  subtaskSelection(){
    this.subtaskEdit = true;
  }

  subtaskLeave(){
    this.subtaskEdit = false;
  }

  activatedSubtaskEdit(){
    console.log('activatedSubtaskEdit');
    this.subtaskEdit = true;
    this.subtaskInput.nativeElement.focus();
  }

  addSubtask(){
    // (blur)="subtaskLeave()" 
    let subtask: string = this.addForm.get('subtask').value;
    if (subtask.trim().length > 0) {
      let newSubtask: string = subtask.trim();
      let checked: boolean = false;
      this.subtasksList.push({subtask: newSubtask, checked: checked});
      console.log('subtaskList: ', this.subtasksList);
      this.addForm.get('subtask').setValue('');
      this.activatedSubtaskEdit();
    }
  }

  closeAddSubtask(){
    this.addForm.get('subtask').setValue('');
    this.subtaskLeave();
    this.subtaskInput.nativeElement.blur();
  }

  btnPressed(event: any){
    if (event.keyCode == 13) {
      this.addSubtask();
    }
    if (event.keyCode == 27) {
      this.closeAddSubtask();
    }
  }


  enabledEdit: boolean = false;
  backg: string = '#f6f7f8';
  enableEdit(){
    this.enabledEdit = true;
    this.backg = '#FFFFFF';
  }



}
