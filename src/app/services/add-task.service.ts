import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    description: new FormControl('', []),
    assignTo: new FormControl('Select contacts to assign', []),
    assignToSelect: new FormControl('', []),
    dueDate: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(14),
    ]),
    subtask: new FormControl('', []),
    subListItem: new FormControl(),
  });


  categoryDropdown: boolean = false;
  @ViewChild('subtaskInput') subtaskInput!: ElementRef;

  constructor( ){}

   
  
}
