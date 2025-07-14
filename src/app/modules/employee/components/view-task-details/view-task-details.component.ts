import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { DemoAngularMaterialModule } from "../../../../DemoAngularMaterialModule";
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-view-task-details',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCard,
    MatDivider,
    DemoAngularMaterialModule
  ],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss'
})
export class ViewTaskDetailsComponent {

   taskId: number;  
    taskData: any;
    comments: any;
    commentForm!: FormGroup;
    constructor(private service:  EmployeeService,
      private activatedRoute: ActivatedRoute,
      private fb: FormBuilder,
      private snackbar: MatSnackBar
      
  
      
  
    ){
      this.taskId = this.activatedRoute.snapshot.params["id"];
  
      this.getTaskById();
      this.getComments();
      this.commentForm = this.fb.group({
        content: [null, Validators.required]
      })
    }
    
      getTaskById(){
        this.service.getTaskById(this.taskId).subscribe((res)=>{
          this.taskData = res;
  
        })
  
      }
  
       getComments(){
        this.service.getCommentsByTask(this.taskId).subscribe((res)=>{
          this.comments = res;
  
        })
  
      }
  
      publishComment(){
        this.service.createComment(this.taskId,this.commentForm.get("content")?.value).subscribe((res)=>{
          if(res.id != null){
            this.snackbar.open("Comment posted successfully", "Close", { duration: 5000 });
            this.getComments();
          } else{
            this.snackbar.open("Something want wrong", "Close", { duration: 5000 });
  
          }
  
          }
        )
      }
  }
  

