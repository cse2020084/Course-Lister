import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private subCourseCategory:string;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private generalService:GeneralMasterService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((value:any)=>{
      this.subCourseId=parseInt(value['id']);
    });

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
        console.log('submenu',this.subCoursesList, this.subCourseId,subCourse.category)
      }
      if(subCourse && subCourse.category) this.subCourseCategory=subCourse.category;

    })

    console.log('submenu',this.subCoursesList, this.subCourseId)
  }

  clickOnSubMenu(course){
    // alert(course.subCategory)
    if(course.subCategory){
      const url:string=`/${this.subCourseCategory}/${course.subCategory}`;
      this.router.navigate([url]);
    }
  }

}
