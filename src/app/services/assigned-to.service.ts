import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { PrioBtnService } from './prio-btn.service';

@Injectable({
  providedIn: 'root'
})
export class AssignedToService {
  assignBtnDisabled = true;


  constructor(
    private data: DataService,
    private prioBtnService: PrioBtnService
  ) { }


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
    if (!this.prioBtnService.isSaving) this.assignBtnDisabled = !this.assignBtnDisabled;
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
   * 
   * @returns {void}
   */
  resetAssignTo(): void {
    this.assignBtnDisabled = true;
    this.data.assignedToList.forEach(contact => {
      contact.checked = false;
    });
  }
}
