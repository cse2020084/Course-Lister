import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  /**
   * The Router service is a singleton - there's only one instance shared across your entire app.
   *  So whether <app-header> is in:

        app.component.html
        dashboard.component.html
        profile.component.html
        Any other component

    *    The navigation will work the same:
   */

  signUpToggle:boolean=true;

  ngOnInit(): void {
  }

  /**
   *   this.router.navigate() is generally better for most cases:
   *   as it takes array of route segments, handles relative paths, easier to add params
   *   this.router.navigateByUrl('/auth/signup') - Takes complete URL string, more direct but less flexible
   * 
   *   // Better - flexible, handles params easily
        this.router.navigate(['/signup', userId], { queryParams: { tab: 'profile' }});

        // vs navigateByUrl - you'd build the string manually
        this.router.navigateByUrl(`/signup/${userId}?tab=profile`);
   */
  navigateToSignUp(){
    console.log('clicked on signup button')
    this.router.navigate(['/auth/signup']);
  }

  /**
 * Router combines parent + child paths but here,
 * Navigation needs the complete combined path
 */

}
