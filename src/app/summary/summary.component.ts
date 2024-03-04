import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  mounthArray: string[] = [
    "unset",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  constructor(public data: DataService) {
    let sortedList = this.sortDataByDueDate();
    console.log(sortedList);
  }

  counterToDo(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 0) {
        counter++;
      }
    });
    return counter;
  }


  counterDone(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 3) {
        counter++;
      }
    });
    return counter;
  }


  counterToDoUrgent(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 0 && task.prio === 1) {
        counter++;
      }
    });
    return counter;
  }


  taskInBoard(): number {
    return this.data.taskList.length;
  }


  taskInProgress(): number {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 1) {
        counter++;
      }
    });
    return counter;
  }


  taskAwaitingFeedback() {
    let counter: number = 0;
    this.data.taskList.forEach(task => {
      if (task.processing_status === 2) {
        counter++;
      }
    });
    return counter;
  }

  sortDataByDueDate() {
    let orderedList = this.data.taskList.sort((a, b) => {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
    return orderedList;
  }


  deadlineReached: boolean = false;
  
  upcomingDeadline(): string {
    if (this.data.taskList.length > 0) {
      let deadline: string = this.data.taskList[0].due_date;
      let day: string = deadline.substring(8, 10);
      let mounthIndex: number = +deadline.substring(5, 7);
      let mounth: string = this.mounthArray[mounthIndex];
      let year: string = deadline.substring(0, 4);
      let upcommingDeadline: string = mounth + ' ' + day + ', ' + year;
      // this.checkDeadlineReached(deadline);
      return upcommingDeadline;
    } else {
      return 'No actual deadline';
    }
  }


  // checkDeadlineReached(deadline: string): void {
  //   const dealineDateNumber: number = new Date(deadline).getTime();
  //   const actualDateNumber: number = new Date().getTime();
  //   const difference: number = actualDateNumber - dealineDateNumber;
  //   if (difference <= 0) {
  //     this.deadlineReached = true;
  //   } else {
  //     this.deadlineReached = false;
  //   }
  // }

  async goToBoard():Promise<void> {
    if (this.data.taskList.length == 0){
      await this.data.generateTaskList();
    }
    this.data.selectedMenu = 3;
  }


  

}
