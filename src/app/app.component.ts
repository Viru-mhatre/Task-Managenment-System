import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { DemoAngularMaterialModule } from './DemoAngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatToolbar,
    DemoAngularMaterialModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'task_angular';
  isEmployeeLoggedIn = false;
  isAdminLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateNavbar();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavbar();
      }
    });
  }

  updateNavbar(): void {
    if (typeof localStorage !== 'undefined') {
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    } else {
      this.isEmployeeLoggedIn = false;
      this.isAdminLoggedIn = false;
    }
  }

  logout(): void {
    StorageService.logout();
    this.router.navigateByUrl('/login').then(() => {
      this.updateNavbar();
    });
  }
}