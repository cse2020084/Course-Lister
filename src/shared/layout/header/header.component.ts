import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private authService:AuthService
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
  isLoggedIn:boolean=false;
  isAuthenticated$:Observable<boolean>=this.authService.isAuthenticated$;
  ngOnInit(): void {
    // this.authService.isAuthenticated$.subscribe((value:boolean)=>{
    //   this.isLoggedIn=value;
    // })
  }

  /**
   *   this.router.navigate() is generally better for most cases:
   *   as it takes array of route segments, handles relative paths, easier to add params
   *   this.router.navigateByUrl('/auth/signup') - Takes complete URL string, more direct but less flexible
   * 
   *   // Better - flexible, handles params easily
        this.router.navigate(['/auth/signup', userId], { queryParams: { tab: 'profile' }});

        // vs navigateByUrl - you'd build the string manually
        this.router.navigateByUrl(`/auth/signup/${userId}?tab=profile`);
   */
  navigateToSignUp(){
    console.log('clicked on signup button')
    this.router.navigate(['/auth/signup']);
  }

  navigateToHome(){
    this.router.navigate(['/']);
  }

  /**
 * Router combines parent + child paths but here,
 * Navigation needs the complete combined path
 */

  logOut(){
    const status=this.authService.logOut();
    if(status){
      this.router.navigate(['/auth/signup']);
    }else{
      console.log(status)
    }
  }

}
