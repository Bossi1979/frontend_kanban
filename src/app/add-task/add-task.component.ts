import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

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


  constructor(public data: DataService){
    
  }


  selectedPrio(prio: number){
    if(prio == this.selectedPrioBtn){
      if(prio == 1) this.urgentSelected = !this.urgentSelected;
      if(prio == 2) this.mediumSelected =!this.mediumSelected;
      if(prio == 3) this.lowSelected = !this.lowSelected;
    } else {
      this.urgentSelected = false;
      this.mediumSelected = false;
      this.lowSelected = false;
      if(prio == 1) this.urgentSelected = true;
      if(prio == 2) this.mediumSelected =true;
      if(prio == 3) this.lowSelected = true;
      this.selectedPrioBtn = prio;
    }
  }


  // assign to function

  assignTxtDisabled = 'Select contacts to assign';
  assignBtnDisabled = true;

  asignToClicked(){
    console.log('asignToClicked');
    if(this.assignBtnDisabled){
      this.assignBtnDisabled = false;
    }
  }

  asignBack(){
    this.assignBtnDisabled = !this.assignBtnDisabled;
  }

}
