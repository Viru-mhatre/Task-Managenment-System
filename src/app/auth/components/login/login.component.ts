import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ){
   this.loginForm = this.fb.group({
  email: [null, [Validators.required, Validators.email]],
  password: [null, [Validators.required]],
 
})

  
  
  }
togglePasswordVisibility(){
this.hidePassword = !this.hidePassword;
}

onSubmit() {
  console.log(this.loginForm.value);
  
  this.authService.login(this.loginForm.value).subscribe((res) => {
    console.log(res);
    
    if (res.userId != null) {
      const user = {
        id: res.userId,
        role: res.userRole // should be exactly 'ADMIN' or 'EMPLOYEE'
      }
      StorageService.saveUser(user);
      StorageService.saveToken(res.jwt);
      
      if (StorageService.isAdminLoggedIn()) {
        this.router.navigateByUrl("/admin/dashboard").then(() => {
          window.location.reload();
        });
      } else if (StorageService.isEmployeeLoggedIn()) {
        this.router.navigateByUrl("/employee/dashboard").then(() => {
          window.location.reload();
        });
      }
      
      this.snackbar.open('Login successful', 'Close', { duration: 5000 });
    } else {
      this.snackbar.open('Invalid credential', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    }
  });
}
}
