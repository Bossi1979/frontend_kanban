import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrioBtnService {
  urgentSelected: boolean = false;
  mediumSelected: boolean = false;
  lowSelected: boolean = false;
  selectedPrioBtn: number = 0;
  isSaving: boolean = false;


  constructor() { }


  /**
  * Selects the priority and updates the selection accordingly.
  * 
  * @param {number} prio - The priority to be selected.
  * @returns {void}
  */
  selectedPrio(prio: number): void {
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
    * @returns {void}
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
   * @returns {void}
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
   * 
   * @returns {void}
   */
  resetPrio(): void {
    this.urgentSelected = false;
    this.mediumSelected = false;
    this.lowSelected = false;
    this.selectedPrioBtn = 0;
  }
}
