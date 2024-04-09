import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-join-header',
  templateUrl: './join-header.component.html',
  styleUrl: './join-header.component.scss'
})
export class JoinHeaderComponent {


  constructor(
    public data: DataService,
    private as: AuthService,
    private router: Router,
    public menuService: MenuService
  ) {
    this.menuService.headerSubmenuView = false;
   }


  /**
   * Initiates the logout process by navigating to the login page, logging out the user, and clearing local storage upon successful logout.
   * 
   * @returns {Promise<void>} A Promise that resolves when the logout process is completed.
   */
  async logout() {
    try {
      this.router.navigateByUrl('/login');
      let response = await this.as.logout();
      console.log(response.message);
      if (response.message == 'logout successfully') localStorage.clear();
      this.data.greetingDone = false;
    } catch (err) {
      alert('logout error');
    }
  }
}
