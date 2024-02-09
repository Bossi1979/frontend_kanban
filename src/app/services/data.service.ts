import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedMenu: number = 0;

  constructor() { }
}
