import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  constructor(public data: DataService) {}
}
