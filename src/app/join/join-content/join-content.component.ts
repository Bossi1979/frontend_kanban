import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-join-content',
  templateUrl: './join-content.component.html',
  styleUrl: './join-content.component.scss'
})
export class JoinContentComponent {

  constructor(public data: DataService) { }

}
