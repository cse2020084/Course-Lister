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
    this.initialization();
    console.log(this.getAllUsers())
  }

  // BehaviorSubject to maintain and share authentication state
  private isAuthenticatedSubject=new BehaviorSubject<boolean>(false);
  private userDataSubject=new BehaviorSubject<UserData | null>(null);

  // Public observables that components can subscribe to
  public isAuthenticated$=this.isAuthenticatedSubject.asObservable();
  public userData$=this.userDataSubject.asObservable();

  private initialization():void{
    try{
      const loginState=localStorage.getItem('LOGIN_STATE');
      const userData=JSON.parse(localStorage.getItem('USER_REGISTRATION'));

      if(loginState==='true' && userData){
        this.isAuthenticatedSubject.next(true);
        this.userDataSubject.next(userData);
      }
    }catch(error){
       console.error(error);
        localStorage.removeItem('LOGIN_STATE');
        localStorage.removeItem('USER_REGISTRATION');
        this.isAuthenticatedSubject.next(false);
        this.userDataSubject.next(null);
    }
  }
  register(userData:UserData):boolean{
    //find return a value, some return boolean
    
    try{
      let existingUsers=this.getAllUsers();
      const userExists=existingUsers.some(user=>userData.email===user.email);
      if(userExists) return false; // user already registered.
      else{
        // this.sharedUsers.push(userData);
        existingUsers.push(userData);
        localStorage.setItem('ALL_USERS',JSON.stringify(existingUsers));
        localStorage.setItem('USER_REGISTRATION',JSON.stringify(userData));
        localStorage.setItem('LOGIN_STATE','true');

        // Update state subjects
        this.isAuthenticatedSubject.next(true);
        this.userDataSubject.next(userData);
        return true;
      }

    }catch(error){
      console.log(error);
      return false;
    }

  }

  logIn(userData:UserData):boolean{
    try{
      let existingUsers=this.getAllUsers();
      console.log('user',userData);
      console.log('exis',existingUsers);
      const userExists=existingUsers.find(user=>user.email===userData.email && user.password===userData.password);
      console.log('userexist',userExists);
      if(!userExists) return false;
      else{
        localStorage.setItem('USER_REGISTRATION',JSON.stringify(userExists));
        localStorage.setItem('LOGIN_STATE','true');

        // Update state subjects
        this.isAuthenticatedSubject.next(true);
        this.userDataSubject.next(userData);
        return true;
      }

    }catch(error){
      console.log(error);
      return false;
    }
  }

  logOut():boolean{
    try{
      localStorage.removeItem('LOGIN_STATE');
      localStorage.removeItem('USER_REGISTRATION')
      this.isAuthenticatedSubject.next(false);
      this.userDataSubject.next(null);
      return true;
    }catch(error){
      console.log(error);
      return false;
    }

  }


  getAllUsers():UserData[]{
    const existingUsers=JSON.parse(localStorage.getItem('ALL_USERS'));
    return existingUsers?existingUsers:[];
  }

    /**
   * Get current login status
   */

  get isAuthenticatedOrNot():boolean{
    const loggedIn=localStorage.getItem('LOGIN_STATE')==='true' && this.isAuthenticatedSubject.value;
    return loggedIn;
  }

    /**
   * Get current user data
   */

  getCurrentUser(): UserData | null{
    if(this.userDataSubject.value){
      return this.userDataSubject.value;
    }
  }
}
