import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-overlay-edit-task',
  templateUrl: './overlay-edit-task.component.html',
  styleUrl: './overlay-edit-task.component.scss'
})
export class OverlayEditTaskComponent {

  task: any = {
    category: 'Technical Task',
    title: 'Dies ist der Titel von Heute',
    description: 'Dies ist der Beschreibung von Heute',
    dueDate: '18/02/2024',
    prio: 3,
    assigned_to: [
      {
        background_color: '#000000',
        name_abbreviation: 'SB',
        username: 'Stefan Boskamp'
      },
      {
        background_color: '#000000',
        name_abbreviation: 'MB',
        username: 'Markus Boskamp'
      },
      {
        background_color: '#000000',
        name_abbreviation: 'SB',
        username: 'Stefan Boskamp'
      },
      {
        background_color: '#000000',
        name_abbreviation: 'MB',
        username: 'Markus Boskamp'
      },

    ]

  };


  constructor(private data: DataService) { }


  closeTaskEditView(): void {
    this.data.startEditTaskView = false;
    this.data.shadowView = false;
  }
}
