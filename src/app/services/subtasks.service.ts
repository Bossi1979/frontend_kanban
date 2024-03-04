import { Injectable } from '@angular/core';
import { ElementRef, ViewChild} from '@angular/core';
import { AddTaskService } from './add-task.service';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  constructor(
    private addTaskService: AddTaskService,
  ) { }

  subtaskListEditActive: number = -1;
  hoveredSubtask: number = -1;
  subtaskEdit: boolean = false;
  @ViewChild('subtaskInput') subtaskInput!: ElementRef;
  subtasksList: any[] = [];


  /**
   * Sets the subtask edit mode to true.
   * 
   * @returns {void}
   */
  subtaskSelection(): void {
    this.subtaskEdit = true;
  }


  /**
   * Sets the subtask edit mode to false.
   * 
   * @returns {void}
   */
  subtaskLeave(): void {
    this.subtaskEdit = false;
  }


   /**
    * Activates subtask edit mode and focuses on the subtask input field.
    * 
    * @returns {void}
  */
   activatedSubtaskEdit(): void {
    this.subtaskEdit = true;
  }
  


  /**
   * Adds a new subtask to the list.
   * 
   * @returns {void}
   */
  addSubtask(): void {
    // (blur)="subtaskLeave()" 
    let subtask: string = this.addTaskService.addForm.get('subtask').value;
    if (subtask.trim().length > 0) {
      let newSubtask: string = subtask.trim();
      let checked: boolean = false;
      this.subtasksList.push({ subtask: newSubtask, checked: checked });
      console.log('subtaskList: ', this.subtasksList);
      this.addTaskService.addForm.get('subtask').setValue('');
      this.activatedSubtaskEdit();
    }
  }


  /**
   * Adds a new subtask to the list.
   * 
   * @returns {void}
   */
  editSubtask(editSubtask: string): void {
    // (blur)="subtaskLeave()" 
    let subtask: string = this.addTaskService.addForm.get('subtask').value;
    if (subtask.trim().length > 0) {
      let newSubtask: string = subtask.trim();
      let checked: boolean = false;
      this.subtasksList.push({ subtask: newSubtask, checked: checked });
      console.log('subtaskList: ', this.subtasksList);
      this.addTaskService.addForm.get('subtask').setValue('');
      this.activatedSubtaskEdit();
    }
  }


  /**
   * Closes the add subtask mode.
   * 
   * @returns {void}
   */
  closeAddSubtask(): void {
    this.addTaskService.addForm.get('subtask').setValue('');
    this.subtaskLeave();
  }


  /**
   * Handles key press events.
   * @param {any} event - The key event object.
   * 
   * @returns {void}
   */
  btnPressed(event: any): void {
    if (this.enterBtnKeyup(event)) this.addSubtask();
    if (this.escBtnKeyup(event)) this.closeAddSubtask();
  }


  /**
   * Sets the hovered subtask index.
   * 
   * @param {number} index - The index of the hovered subtask.
   * @returns {void}
   */
  subtaskHovered(index: number): void {
    this.hoveredSubtask = index;
  }


  /**
   * Resets the hovered subtask index to -1.
   * 
   * @returns {void}
   */
  subtaskNotHovered(): void {
    this.hoveredSubtask = -1;
  }


  /**
   * Activates editing mode for a subtask list item.
   * 
   * @param {number} index - The index of the subtask list item.
   * @returns {void}
   */
  editSubtaskList(index: number): void {
    this.subtaskListEditActive = index;
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
    this.addTaskService.addForm.get('subListItem').setValue(this.subtasksList[index].subtask);
  }


  /**
   * Leaves subtask list edit mode for the specified index.
   * 
   * @param {number} index - The index of the subtask list item.
   * @returns {void}
   */
  leaveSubtaskListEdit(index: number): void {
    let editValue = this.addTaskService.addForm.get('subListItem').value;
    if (editValue.trim().length > 0 && !this.escBtnPressed) this.subtasksList[index].subtask = editValue.trim();
    else if (!this.escBtnPressed) this.deleteSubTaskItem(index);
    this.subtaskListEditActive = -1;
  }


  /**
   * Deletes a subtask list item at the specified index.
   * 
   * @param {number} index - The index of the subtask list item to delete.
   * @returns {void}
   */
  deleteSubTaskItem(index: number): void {
    this.subtasksList.splice(index, 1);
  }

  
  /**
   * Handles double-click events on a subtask list item.
   * 
   * @param {number} index - The index of the subtask list item.
   * @returns {void}
   */
  doubleClick(index: number): void {
    this.editSubtaskList(index);
  }


  escBtnPressed: boolean = false;


  /**
   * Handles key press events on a subtask list item.
   * 
   * @param {any} event - The key event object.
   * @param {number} index - The index of the subtask list item.
   * @returns {void}
   */
  subtaskItemListBtnPressed(event: any, index: number): void {
    if (this.enterBtnKeyup(event)) this.leaveSubtaskListEdit(index);
    if (this.escBtnKeyup(event)) { 
      this.escBtnPressed = true;
      this.subtaskListEditActive = -1;
    }
    setTimeout(() => {
      this.escBtnPressed = false;
    }, 500);
  }


  /**
   * Checks if the Enter key (keyCode 13) is pressed.
   * 
   * @param {any} event - The key event object.
   * @returns {boolean} - True if the Enter key is pressed, otherwise false.
   */
  enterBtnKeyup(event: any): boolean{
    return event.keyCode == 13
  }


  /**
   * Checks if the Escape key (keyCode 27) is pressed.
   * 
   * @param {any} event - The key event object.
   * @returns {boolean} - True if the Escape key is pressed, otherwise false.
   */
  escBtnKeyup(event: any): boolean {
    return event.keyCode == 27
  }
}
