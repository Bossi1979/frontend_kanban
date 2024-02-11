import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-join-header',
  templateUrl: './join-header.component.html',
  styleUrl: './join-header.component.scss'
})
export class JoinHeaderComponent {

  constructor(public data: DataService){}

}
