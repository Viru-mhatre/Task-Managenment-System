import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { title } from 'process';
import { Title } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatDivider,
    MatIcon,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatLabel,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listOfTasks: any = [];
  searchForm!: FormGroup;
  constructor(private service: AdminService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ){
    this.getTasks();
    this.searchForm = this.fb.group({
      title : [null]

    })

  }

  getTasks(){
    this.service.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
    }
  )  

    }

    deleteTask(id:number){
      this.service.deleteTask(id).subscribe((res) => {
        this.snackbar.open("Task deleted succesfully", "Close", {duration: 5000});
        this.getTasks();
      }
      )
    }

    searchTask() {
  this.listOfTasks = [];

  const title = this.searchForm.get('title')!.value;
  console.log(title);

  if (!title || title.trim() === '') {
    this.getTasks(); // fallback to all
    return;
  }

  this.service.serachTask(title).subscribe({
    next: (res) => {
      console.log(res);
      this.listOfTasks = res;
    }
  })
}
}


 