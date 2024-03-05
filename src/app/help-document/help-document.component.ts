import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-help-document',
  templateUrl: './help-document.component.html',
  styleUrl: './help-document.component.scss'
})
export class HelpDocumentComponent {


  constructor(public data: DataService){}

  backToSummary(){
    this.data.selectedMenu = 1;
  }

}
