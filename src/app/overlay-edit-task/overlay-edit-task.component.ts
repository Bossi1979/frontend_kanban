import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubtasksService } from '../services/subtasks.service';

@Component({
  selector: 'app-overlay-edit-task',
  templateUrl: './overlay-edit-task.component.html',
  styleUrl: './overlay-edit-task.component.scss'
})
export class OverlayEditTaskComponent {
  taskCard: Task = new Task();
  urgentSelected: boolean = false;
  mediumSelected: boolean = false;
  lowSelected: boolean = false;
  selectedPrioBtn: number = 0;
  isSaving: boolean = false;
  assignBtnDisabled = true;
  @ViewChild('subtaskInput') subtaskInput!: ElementRef;
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


  constructor(public data: DataService, private auth: AuthService, public subtaskService: SubtasksService) {
    this.subtaskService.subtasksList = [];
    this.resetAssignTo();
    this.taskCard.setTaskCardData(this.data.selectedTask);
    this.selectPrioBtn(this.data.selectedTask['prio'])
    console.log(this.data.selectedTask);
    this.setAssignedToList();
    let task: any[] = [];
    this.subtaskService.subtasksList = this.data.selectedTask['subtask'];
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
   * Resets the assigned contacts to their initial state and disables the assignment button.
   */
  resetAssignTo(): void {
    this.assignBtnDisabled = true;
    this.data.assignedToList.forEach(contact => {
      contact.checked = false;
    });
  }


  setAssignedToList(){
    let list = this.data.assignedToList;
    this.taskCard.assignTo.forEach(assigned => {
      let userId = assigned.id_user;
      let foundIndex = list.findIndex(contact =>  contact.id_user === userId );
      if (foundIndex != -1) this.data.assignedToList[foundIndex].checked = true;
    });
  }


 // Subtask functionality

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
    this.editForm.get('subtask').setValue('');
    this.subtaskInput.nativeElement.blur();
    this.subtaskService.subtaskEdit = false;
  }



  /**
   * Adds a new subtask to the list.
   * 
   * @returns {void}
   */
  addSubtask(): void {
    let subtask: string = this.editForm.get('subtask').value;
    if (subtask.trim().length > 0) {
      let newSubtask: string = subtask.trim();
      let checked: boolean = false;
      this.subtaskService.subtasksList.push({ subtask: newSubtask, checked: checked });
      console.log('subtaskList: ', this.subtaskService.subtasksList);
      this.editForm.get('subtask').setValue('');
      this.activatedSubtaskEdit();
    }
  }


  /**
   * Handles key press events.
   * @param {any} event - The key event object.
   * 
   * @returns {void}
   */
  btnPressed(event: any): void {
    if (this.subtaskService.enterBtnKeyup(event)) this.addSubtask();
    if (this.subtaskService.escBtnKeyup(event)) this.closeAddSubtask();
  }



  /**
   * Activates editing mode for a subtask list item.
   * 
   * @param {number} index - The index of the subtask list item.
   * @returns {void}
   */
  editSubtaskList(index: number): void {
    this.subtaskService.subtaskListEditActive = index;
    this.setEditInputValue(index);
    this.setSubtaskListItemInputOnFocus(index);
  }


  /**
   * Sets focus on the input field of the subtask list item after a delay.
   * 
   * @param {number} index - The index of the subtask list item.
   * @returns {void}
   */
  setSubtaskListItemInputOnFocus(index: number): void {
    let id = 'subtaskListItem' + index;
    setTimeout(() => {
      let inputElement = document.getElementById(id) as HTMLInputElement;
      inputElement.focus();
    }, 500)
  }


  /**
   * Sets the value of the edit input field for a subtask list item.
   * 
   * @param {number} index - The index of the subtask list item.
   * @returns {Promise<void>}
   */
  async setEditInputValue(index: number): Promise<void> {
    this.editForm.get('subListItem').setValue(this.subtaskService.subtasksList[index].subtask);
  }


  /**
   * Leaves subtask list edit mode for the specified index.
   * 
   * @param {number} index - The index of the subtask list item.
   * @returns {void}
   */
  leaveSubtaskListEdit(index: number): void {
    let editValue = this.editForm.get('subListItem').value;
    if (editValue.trim().length > 0 && !this.subtaskService.escBtnPressed) this.subtaskService.subtasksList[index].subtask = editValue.trim();
    else if (!this.subtaskService.escBtnPressed) this.subtaskService.deleteSubTaskItem(index);
    this.subtaskService.subtaskListEditActive = -1;
  }


// ende of subtask functionality


  closeTaskEditView(): void {
    this.data.startEditTaskView = false;
    this.data.shadowView = false;
  }


  async changeSubtaskCheckbox(subIndex: number): Promise<void> {
    this.taskCard.subtask[subIndex].checked =!this.taskCard.subtask[subIndex].checked;
    this.data.taskList[this.data.selectedTaskIndex].subtask[subIndex].checked = this.taskCard.subtask[subIndex].checked;
    let response = await this.auth.updateTask(this.taskCard);
    console.log(response);
  }
  

  async deleteTask(): Promise<void> {
    this.closeTaskEditView();
    const response = await this.auth.deleteTask(this.taskCard.id);
    console.log(response);
    if (response.message == 'Task deleted successfully'){
      this.data.taskList.splice(this.data.selectedTaskIndex, 1);
    }
  }


  async saveTaskChanges(): Promise<void> {
    this.editForm.disable();
    await this.editTaskCardData();
    await this.updateTaskList();
    this.closeTaskEditView();
    let response = await this.auth.updateTask(this.taskCard);
    console.log(response);
  }


  async editTaskCardData(): Promise<void> {
    let formData = this.editForm.value;
    this.taskCard.title = formData.title;
    this.taskCard.description = formData.description;
    this.taskCard.dueDate = formData.dueDate;
    this.taskCard.subtask = this.data.selectedTask['subtask'];
    this.taskCard.prio = this.selectedPrioBtn;
    this.taskCard.assignTo = await this.createAssignedToList();
  }


  async updateTaskList(): Promise<void> {
    this.data.taskList[this.data.selectedTaskIndex] = this.taskCard.createTaskListItem();
  }


  async createAssignedToList(): Promise<any> {
    let assignedList: any[] = [];
    this.data.assignedToList.forEach(user => {
      if (user.checked === true) {
        assignedList.push(user);
      }
    });
    return assignedList
  }


}
