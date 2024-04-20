import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sliding-messages',
  templateUrl: './sliding-messages.component.html',
  styleUrl: './sliding-messages.component.scss'
})
export class SlidingMessagesComponent {
  messageArray: string[] = [
    'Contact succesfully created',
    'Contact succesfully updated',
    'Contact succesfully deleted',
    'Tasks succesfully created',
    'Tasks succesfully updated',
    'Tasks succesfully deleted'
  ];

  
  constructor(public data: DataService) { }
}
