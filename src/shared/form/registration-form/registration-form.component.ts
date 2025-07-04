import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() switchToLogin=new EventEmitter<void>();
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
      confirmpw:['',[Validators.required]],
      check:[false,[Validators.requiredTrue]]
    },{
      validators:this.confirmPassword('password','confirmpw')
    })
  }

  confirmPassword(password,confirmpw):ValidatorFn{
    return (formGroup:AbstractControl):{[key:string]:any}=>{
      const pwControl=formGroup.get(password) as FormControl;
      const cpControl=formGroup.get(confirmpw) as FormControl;

      if(!pwControl.value || !cpControl.value) return null;
      if(pwControl.value!==cpControl.value){
        cpControl.setErrors({'notMatch':true});
        return {'notMatch':true};
      }else{
        if(cpControl.hasError('notMatch')) cpControl.setErrors(null);
        return null;
      }
      
    }
  }

  get mailControl():FormControl{
    return this.form.get('mail') as FormControl;
  }

  get passwordControl():FormControl{
    return this.form.get('password') as FormControl;
  }

  get confirmpwControl():FormControl{
    return this.form.get('confirmpw') as FormControl;
  }

  get checkControl():FormControl{
    return this.form.get('check') as FormControl;
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

  switchToLoginComponent(){
    this.switchToLogin.emit();
  }

}
