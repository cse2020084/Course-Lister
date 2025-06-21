import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { GeneralMasterService } from 'src/shared/services/general-master.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  public subCoursesList:any[]=[];
  private subCourseId:number;
  constructor(
    private route:ActivatedRoute,
    private generalService:GeneralMasterService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((value:any)=>{
      this.subCourseId=parseInt(value['id']);
    })

    this.generalService.getCoursesFromJson('assets/json/sub-main-courses.json')
    .pipe(map((data)=>{
      return data.filter((f)=>f.hasOwnProperty("superID"))
    }))
    .subscribe((value:any[])=>{
      console.log('super id',this.subCourseId)
      let subCourse:any;
      if(this.subCourseId){
        subCourse=value.find(f=>f.superID===this.subCourseId);
        this.subCoursesList=subCourse.courses;
        console.log('submenu',this.subCoursesList, this.subCourseId)
      }

    })

    console.log('submenu',this.subCoursesList, this.subCourseId)
  }

}
