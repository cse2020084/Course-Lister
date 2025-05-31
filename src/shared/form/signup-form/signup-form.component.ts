import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationData, LocationDataService } from 'src/shared/services/location-data.service';

/*
You need to import ReactiveFormsModule in the module where you declare and use this component.
If SignupFormComponent is declared in SharedModule, import ReactiveFormsModule in SharedModule.
If declared in AppModule, import it there.
You do not need to import it in both modules unless the component is declared in both.
*/
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  private destroy$ = new Subject<void>();
  constructor(private fb:FormBuilder,
              private location:LocationDataService
  ) { }

  ngOnInit(): void {
    this.initializeCountries();
    this.createForm();
    console.log('form',this.form);
    this.valueChangesForKeys();
  }

  /**
   * should have used behavioursubject, instead of list,
   * if data originally is coming from any api or dynamic
   * instead of static one
  */
  countries:string[]=[];
  states:string[]=[];
  cities:string[]=[];

  public form:FormGroup;

  createForm(){
    this.form = this.fb.group({       //new FormGroup({}) can be used too
      name: ['',[Validators.required,this.forbiddenWordsValidator()]],
      email: new FormControl('', [Validators.required,Validators.email]),
      mobile:['',[Validators.required,Validators.pattern('^[\\d]{3,10}$')]],
      password:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9!@#$%]{4,}$')]],
      confirmpw:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9!@#$%]{4,}$')]],
      altPhone:this.fb.array([]),
      job: new FormControl('', [Validators.required]), // '' means no radio is selected by default
      address:this.fb.group({
        country: ['',[Validators.required]],// select type
        state: ['',[Validators.required]],
        city:['',[Validators.required]]
      }),
      check:new FormControl(false,[Validators.requiredTrue]), // checkbox type
    },{
      validators:this.confirmPasswordValidator('password','confirmpw')
    });
  }

  forbiddenWordsValidator():ValidatorFn{
    /**
     * It will be a factory function i.e, which return another function
     * we can directly return ValidatorFn type ,
     * but its good to follow this approach
     * since it can also allow to use parameter here
     */

    const forbiddenWords:RegExp=/\b(admin|password)\b/    // \b is used for limiting scope of these words.
    
    return (control:AbstractControl) :{[key:string]:any} =>{
      const forbiddenValue=forbiddenWords.test(control.value);
      return forbiddenValue?{'forbiddenName':true}:null;  // we could have send anything in  value like value:control.value

    }
    
  }

  confirmPasswordValidator(password,confirmpw):ValidatorFn{

    return (formGroup:AbstractControl):{[key:string]:any} =>{
      const passwordControler=formGroup.get(password) as FormControl;
      const confirmpwControler=formGroup.get(confirmpw) as FormControl;
      if(!passwordControler.value || !confirmpwControler.value) return null;
      if (confirmpwControler.errors && !confirmpwControler.errors['notSamePassword']) {
      return null;
    }
      if(passwordControler.value!==confirmpwControler.value) this.confirmpwControl.setErrors({'notSamePassword':true});
      else this.confirmpwControl.setErrors(null);

      return null;
    }
  }

  initializeCountries(){
    /**
     * Initialize the list of inputs that will be required without any dependency
     */
    this.countries=this.location.setUpCountryList();
  }

  valueChangesForKeys(){
    /**
     * keep track of those form control, which will be used as dependency for other form control
     */
    this.countryControl.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((value:string)=>{
      this.onCountryChange(value);
    },error=> console.log(error));

    this.stateControl.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe((value:string)=>{
      this.onStateChange(value);
    },error=> console.log(error));
  }

  // Getters for form controls
  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl():FormControl{
    return this.form.get('password') as FormControl;
  }

  get confirmpwControl():FormControl{
    return this.form.get('confirmpw') as FormControl;
  }

  get mobileControl(): FormControl {
    return this.form.get('mobile') as FormControl;
  }

  get jobControl(): FormControl {
    return this.form.get('job') as FormControl;
  }

  get checkControl(): FormControl {
    return this.form.get('check') as FormControl;
  }

  get addressGroup(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get countryControl(): FormControl {
    return this.addressGroup.get('country') as FormControl;
  }

  get stateControl(): FormControl | null {
    return this.addressGroup.get('state') as FormControl;
  }

  get cityControl(): FormControl | null {
    return this.addressGroup.get('city') as FormControl;
  }

  get getAltPhone():FormArray |null{
    return this.form.get('altPhone')  as FormArray;
  }

  onCountryChange(selectedCountry:string){
    this.removeState();
    this.removeCity();

    this.states=this.location.setUpStateList(selectedCountry);
  }

  onStateChange(selectedState:string){
    this.removeCity();
    this.cities=this.location.setUpCityList(this.countryControl.value,selectedState);
  }

  removeState(){
    //used for setting state to go reset when changes in country happen
    if(this.stateControl){
      this.stateControl.reset('');
    }  
  }

  removeCity(){
    if(this.cityControl){
      this.cityControl.reset('');
    }
  }

  addAltPhone(){
    /**
     * we are still adding mobile numbers 
     * but since they are dynamic, 
     *  we're adding them at runtime to a FormArray, 
     * we use new FormControl() explicitly.
     */
    this.getAltPhone.push(new FormControl('',[Validators.required,,Validators.pattern('^[\\d]{3,10}$')]));   
  }

  removeAltPhone(index:number){
    this.getAltPhone.removeAt(index);
  }

  onSubmit(){
    this.form.markAllAsTouched();
    console.log(this.form);
    console.log('address',this.form.get('address').get('city'))
  }

  ngOnDestroy() {
    /**
     * as soon as component will be destroyed,
     * this destroy$ subject emit value,
     * which give signal to takeUntil operator,
     * to unscubscribe earlier observable/subject
     * after that destroy$ itself get completed and cleaned up
     */
    this.destroy$.next();
    this.destroy$.complete(); // Cleans up all subscriptions 
  }

}
