import { Component, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { AuthStateService } from './core';

@Component({
  selector: 'AppComponent',
  template: `<div class="default-theme">
      <SidebarComponent
        (login)="login()"
        (logoff)="logout()"
        [loginResponse]="loginResponse()"
      />
    </div>
    <ngx-scrolltop></ngx-scrolltop>`,
  standalone: true,
  imports: [NgIf, MatProgressBarModule, SidebarComponent, NgxScrollTopModule],
})
export class AppComponent {
  private oidcSecurityService = inject(OidcSecurityService);
  private authStateService = inject(AuthStateService);

  title = 'blog-frog-16';
  loginResponse = this.authStateService.loginResponse;

  login() {
    this.oidcSecurityService.authorize();
  }
  logout() {
    this.oidcSecurityService.logoff().subscribe((x) => console.log(x));
  }
}
