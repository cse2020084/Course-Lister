import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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


  countries:string[]=[];
  states:string[]=[];
  cities:string[]=[];

  public form:FormGroup;

  createForm(){
    this.form = this.fb.group({       //new FormGroup({}) can be used too
      name: ['',[Validators.required]],
      email: new FormControl('', [Validators.required]),
      mobile:['',[Validators.required]],
      altPhone:this.fb.array([]),
      job: new FormControl('', [Validators.required]), // '' means no radio is selected by default
      address:this.fb.group({
        country: ['',[Validators.required]],// select type
        state: [''],
        city:['']
      }),
      check:new FormControl(false,[Validators.requiredTrue]), // checkbox type

    });
  }

  initializeCountries(){
    this.countries=this.location.setUpCountryList();
  }

  valueChangesForKeys(){
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
     * and we're adding them at runtime to a FormArray, 
     * we use new FormControl() explicitly.
     */
    this.getAltPhone.push(new FormControl('',[Validators.required]));   
  }

  removeAltPhone(index:number){
    this.getAltPhone.removeAt(index);
  }

  onSubmit(){
    console.log(this.form);
    console.log('address',this.form.get('address').get('city'))
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete(); // Cleans up all subscriptions 
  }

}
