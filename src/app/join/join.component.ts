import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MenuService } from '../services/menu.service';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss'
})
export class JoinComponent {
  greetingResponsiv: string;


  constructor(
    private router: Router, 
    public data: DataService, 
    public menuService: MenuService,
    ) {
    const token = localStorage.getItem('token');
    if (token == "undefined" || token == undefined || token == null) router.navigateByUrl('/login');
    this.menuService.mouseEnter(1);
    this.menuService.selectMenu(1);
    this.data.innerWidth = window.innerWidth;
    this.determineTheTimeOfDay();
  }


  @HostListener('window:resize', ['$event'])

  /**
   * Handles the resize event by updating the innerWidth property with the current window inner width,
   * logging the resize event to the console, and calling the resizeAction method.
   * 
   * @param event The resize event object.
   */
  onResize(event)  {
    this.data.innerWidth = window.innerWidth;
    console.log('resize event');
    this.resizeAction();
  }


  /**
   * Adjusts the view based on the innerWidth property.
   * If the innerWidth is greater than 1400, sets shadowView to false and slideOutSidebar to true.
   */
  resizeAction(){
    if (this.data.innerWidth > 1400){
      this.data.shadowView = false;
      this.menuService.slideOutSidebar = true;
    }
  }


  /**
   * Asynchronously determines the time of day and sets a greeting message accordingly.
   * 
   * @returns {Promise<void>} A Promise that resolves when the time of day is determined.
   */
  async determineTheTimeOfDay(): Promise<void> {
    const actualDate: Date = new Date();
    const actualTimeHours: number = actualDate.getHours();
    if (actualTimeHours >= 5 && actualTimeHours < 11) this.greetingResponsiv = 'Good morning,';
    else if (actualTimeHours >= 11 && actualTimeHours < 18) this.greetingResponsiv = 'Good afternoon,';
    else if (actualTimeHours >= 18 && actualTimeHours < 22) this.greetingResponsiv = 'Good evening,';
    else this.greetingResponsiv = 'Welcome,';
    setTimeout(() => {
      this.data.greetingDone = true;
    }, 4000);
  }
}

