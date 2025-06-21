import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralMasterService } from 'src/shared/services/general-master.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  /**
   * both are same, one is js centric , other is angular
   * @ViewChild('myElement') myElement!: ElementRef;
   * document.getElementById('myElement')
   */
  @ViewChild('mainContentSection') mainContentSection:ElementRef;
  public mainCourses:any[]=[];

  constructor(
    private generalMasterService:GeneralMasterService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadMainCourses();
  }

  loadMainCourses(){
    this.generalMasterService.getCoursesFromJson('assets/json/main-courses.json')
    .pipe(map((m:any)=>{
      return m.filter(f=>f.hasOwnProperty('id'))
    }))
    .subscribe((value)=>{
      this.mainCourses=value;
      console.log('maincourse',this.mainCourses)
    },
    (error)=>{
      this.mainCourses=[];
    })
  }

  preview(courses){
    this.router.navigate(['/dashboard/sub-menu',courses.id]);
  }

  exploreCourseButton(){
    this.mainContentSection.nativeElement.scrollIntoView({behavior:'smooth'});
  }

}
