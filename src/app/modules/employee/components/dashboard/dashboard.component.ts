import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemoAngularMaterialModule } from "../../../../DemoAngularMaterialModule";
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, // ✅ REQUIRED
  imports: [
    ReactiveFormsModule,
    CommonModule, // ✅ Enables *ngFor, *ngIf, pipes, etc.
    DemoAngularMaterialModule,
    MatCardModule,
    MatMenu,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks: any = [];
  constructor(private service:EmployeeService,
    private snackbar: MatSnackBar
  ){
    this.getTasks();
  }

  getTasks(){
    this.service.getEmployeeTasksById().subscribe((res)=>{
      console.log(res);
      this.listOfTasks = res;

    }
    )
  }

  updateStatus(id: number, status: string){
    this.service.updateStatus(id, status).subscribe((res) => {
      if(res.id!= null){
        this.snackbar.open("Task status updated succesfully", "Close", { duration: 5000 });
        this.getTasks();
      } else{
        this.snackbar.open("Getting error while updating task", "Close", { duration: 5000 });

      }

      })
    }
    

  }


