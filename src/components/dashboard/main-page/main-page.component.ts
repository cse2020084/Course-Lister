import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralMasterService } from 'src/shared/services/general-master.service';
import { map } from 'rxjs/operators';


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
  ) { }

  ngOnInit(): void {
    this.loadMainCourses();
  }

  loadMainCourses(){
    this.generalMasterService.getCoursesFromJson('assets/json/main-courses.json')
    .pipe(map((m:any)=>{
      return m.filter(f=>f.hasOwnProperty('id'))
    }))
    .subscribe((value:any[])=>{
      this.mainCourses=value;
      console.log('maincourse',this.mainCourses)
    },
    (error)=>{
      this.mainCourses=[];
    })
  }

  exploreCourseButton(){
    this.mainContentSection.nativeElement.scrollIntoView({behavior:'smooth'});
  }

}
