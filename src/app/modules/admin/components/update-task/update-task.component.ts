
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {
  id!: number;
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [] ;
  listOfPriorities: any = ['LOW', 'MEDIUM', 'HIGH'];
  listOfTaskStatus: any = ['PENDING', 'INPROGRESS', 'COMPLETED', 'DEFERRED', 'CANCELLED'];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];

    this.getTaskById();
    this.getUsers();

    this.updateTaskForm = this.fb.group({
      employeeId: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      dueDate: [null, Validators.required],
      priority: [null, Validators.required],
      taskStatus: [null, Validators.required],
    });
  }

  getTaskById() {
    this.adminService.getTaskById(this.id).subscribe((res) => {
      this.updateTaskForm.patchValue(res);
      console.log(res);
  

      
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
      console.log(res);
    });
  }

  
  updateTask() {
    if (this.updateTaskForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 4000 });
      return;
    }

    console.log('Updating task with:', this.updateTaskForm.value);

    this.adminService.updateTask(this.id, this.updateTaskForm.value).subscribe({
      next: (res) => {
        this.snackBar.open('Task updated successfully', 'Close', { duration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        this.snackBar.open('Failed to update task', 'ERROR', { duration: 5000 });
        console.error(err);
      }
    });
  }
}
