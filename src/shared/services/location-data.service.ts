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
