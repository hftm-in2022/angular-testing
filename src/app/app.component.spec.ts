import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { LoadingStateService } from './core/loading-state.service';
import { of } from 'rxjs';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let oidcSecurityServiceMock: OidcSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(NgxScrollTopModule),
        MockComponent(SidebarComponent),
        AppComponent,
      ],
      providers: [
        provideRouter([]),
        MockProvider(OidcSecurityService),
        MockProvider(LoadingStateService),
      ],
    });

    oidcSecurityServiceMock = TestBed.inject(OidcSecurityService);
    spyOn(oidcSecurityServiceMock, 'checkAuth').and.returnValue(
      of({} as LoginResponse),
    );
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'blog-frog-16'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('blog-frog-16');
  });
});
