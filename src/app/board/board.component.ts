import { Component} from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {


  constructor(public data: DataService) {
    this.data.taskList.length
  }


  countSubtasksDone(taskIndex: number): number {
    const subtasks: any[] = this.data.taskList[taskIndex].subtask;
    let doneCounter = 0;
    subtasks.forEach(sub => {
      if (sub.checked == true) {
        doneCounter++;
      }
    });
    return doneCounter;
  }


  calculateDoneBarWidth(taskIndex: number): string {
    let doneCounter = this.countSubtasksDone(taskIndex);
    let subtaskAmount = this.data.taskList[taskIndex].subtask.length;
    let percentDone = (doneCounter / subtaskAmount) * 100;
    let percentDoneSting = percentDone.toString() + '%';
    return percentDoneSting;
  }


  draggedTaskIndex: number;
  highligtedProcessingIndex: number;
  selectedTaskCardIndex: number;
  startDragging(index: number): void {
    this.draggedTaskIndex = index;
  }


  drop(category: number): void {
    this.highligtedProcessingIndex = -1;
    this.data.taskList[this.draggedTaskIndex].processing_status = category;
  }


  allowDrop(event: any): void {
    event.preventDefault();
  }


  enableHigligthedDopArea(index: number){
    this.highligtedProcessingIndex = index;
  }


  disableHighligthedDopArea(): void {
    this.highligtedProcessingIndex = -1;
  }


  clickTaskCard(index: number): void {
    console.log("clickTaskCardIndex: ", index);
    this.data.startEditTaskView = true;
    this.data.shadowView = true;
  }




  
}
