import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-overlay-edit-task',
  templateUrl: './overlay-edit-task.component.html',
  styleUrl: './overlay-edit-task.component.scss'
})
export class OverlayEditTaskComponent {


  constructor(private data: DataService) { }


  closeTaskEditView(): void {
    this.data.startEditTaskView = false;
    this.data.shadowView = false;
  }
}
