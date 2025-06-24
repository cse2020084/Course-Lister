import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() switchToRegister=new EventEmitter<void>();

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  form:FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  createForm(){
    this.form=this.fb.group({
      mail:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]],
    })
  }


  get mailControl():FormControl{
    return this.form.get('mail') as FormControl;
  }

  get passwordControl():FormControl{
    return this.form.get('password') as FormControl;
  }



  cancelForm(){
    console.log(this.form.value)
    this.form.reset();
    console.log(this.form.value)
  }

  submitForm(){
    if(this.form.valid){
      const formData = this.form.value;
      const userData={
        email:formData.mail,
        password:formData.password,
        registrationDate:new Date().toISOString(),
        isRegistered:true
      }

      const success=this.auth.register(userData);
      if(success){
        this.router.navigate(['/dashboard']);
      }else{
        // this.form.markAllAsTouched();
        alert('something went wrong')
        this.form.reset()
      }
    }
  }
  switchToRegisterComponent(){
    this.switchToRegister.emit();
  }

}
