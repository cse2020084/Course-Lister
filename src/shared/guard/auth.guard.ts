import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate ,OnInit{
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if(!this.isLoggedIn){
    //   this.router.navigate(['/auth/signup']);
    //   return false;
    // }
    const loggedIn=this.authService.isAuthenticatedOrNot;
    if(loggedIn){
      return true;
    }else{
      // map transforms the boolean into either true or a redirect UrlTree.
      // createUrlTree() is preferred in guards over direct router.navigate() (cleaner and more testable).
      this.router.navigate(['/auth/signup']);
      return false;

      // this.router.createUrlTree(['/auth/signup']);
    }
    // return true;
  }

  isLoggedIn:boolean=false;;

  constructor(private authService:AuthService,
    private router:Router
  ){
      // this.authService.isAuthenticated$.subscribe((value:boolean)=>{
      //   this.isLoggedIn=value;
      // })
  }

  ngOnInit(): void {

  }




  
}
