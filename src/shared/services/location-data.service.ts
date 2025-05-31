import { Injectable } from '@angular/core';

export interface LocationData{
  [country:string]: {
    [state:string]:  string[]
  }
}

@Injectable({
  providedIn: 'root'
})

export class LocationDataService {

  constructor() { }

  private locationData: LocationData = {
      "USA": {
        "California": ["Los Angeles", "San Francisco", "San Diego"],
        "Texas": ["Houston", "Dallas", "Austin"],
        "New York": ["New York City", "Buffalo", "Albany"]
      },
      "Canada": {
        "Ontario": ["Toronto", "Ottawa", "Hamilton"],
        "Quebec": ["Montreal", "Quebec City", "Laval"],
        "British Columbia": ["Vancouver", "Victoria", "Surrey"]
      },
      "India": {
        "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"]
      }
  };

  setUpCountryList():string[]{
    return Object.keys(this.locationData);
  }

  setUpStateList(selectedCountry:string):string[]{
    /**
     * any time if you want to get string as key and object as value 
     * and you want key of those object (value),
     * go in object directly using "original_object[key]"
     * 
     * also you can use original_object?.[key] , it is more correct
     *  you need the "?." for optional chaining:
    */
    if(this.locationData[selectedCountry]){
      return Object.keys(this.locationData[selectedCountry]);
    }
    return [];
  }

  setUpCityList(selectedCountry,selectedState:string):string[]{
    if(this.locationData[selectedCountry]){
      const stateForCity=this.locationData[selectedCountry];
      return  stateForCity[selectedState];
    };
   return [];
  }




}
