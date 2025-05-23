import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralMasterService {
  constructor(private http: HttpClient) { }

  // For API
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>('your-api-endpoint/courses');
  }

  // For local JSON file (in assets folder)
  getCoursesFromJson(url:string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }
}