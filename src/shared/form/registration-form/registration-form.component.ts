import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  constructor(
    private fb:FormBuilder
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

}
