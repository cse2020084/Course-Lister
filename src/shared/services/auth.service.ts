import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  email: string;
  password: string;
  registrationDate: string;
  isRegistered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sharedUsers:UserData[];
  constructor() {

  }

  // BehaviorSubject to maintain and share authentication state
  private isAuthenticatedSubject=new BehaviorSubject<boolean>(false);
  private userDataSubject=new BehaviorSubject<UserData | null>(null);

  // Public observables that components can subscribe to
  public isAuthenticated$=this.isAuthenticatedSubject.asObservable;
  public userData$=this.userDataSubject.asObservable;


  register(userData:UserData):boolean{
    //find return a value, some return boolean
    
    try{
      let existingUsers=this.getAllUsers();
      const userExists=existingUsers.some(user=>userData.email===user.email);
      if(userExists) return false; // user already registered.

      // this.sharedUsers.push(userData);
      existingUsers.push(userData);
      localStorage.setItem('ALL_USERS',JSON.stringify(existingUsers));
      localStorage.setItem('USER_REGISTRATION',JSON.stringify(userData));
      localStorage.setItem('LOGIN_STATE','true');

      // Update state subjects
      this.isAuthenticatedSubject.next(true);
      this.userDataSubject.next(userData);
      return true;
    }catch(error){
      console.log(error);
      return false;
    }

  }

  logIn(userData:UserData):boolean{
    try{
      let existingUsers=this.getAllUsers();
      const userExists=existingUsers.find(user=>user.email===userData.email && user.password===userData.password);
      if(!userExists) return false;
      localStorage.setItem('USER_REGISTRATION',JSON.stringify(userData));
      localStorage.setItem('LOGIN_STATE','true');

      // Update state subjects
      this.isAuthenticatedSubject.next(true);
      this.userDataSubject.next(userData);
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  logOut(){
    localStorage.removeItem('LOGIN_STATE');
    this.isAuthenticatedSubject.next(false);

  }


  getAllUsers():UserData[]{
    const existingUsers=JSON.parse(localStorage.getItem('ALL_USERS'));
    return existingUsers?existingUsers:[];
  }
}
