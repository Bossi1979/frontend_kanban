import { Component } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-overlay-add-contact-done',
  templateUrl: './overlay-add-contact-done.component.html',
  styleUrl: './overlay-add-contact-done.component.scss'
})
export class OverlayAddContactDoneComponent {
  messageArray: string[] = [
    'Contact succesfully created',
    'Contact succesfully updated',
    'Contact succesfully deleted',
    'Tasks succesfully created',
    'Tasks succesfully updated',
  ];

  
  constructor(public data: DataService) { }
}
