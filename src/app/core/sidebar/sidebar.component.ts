import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
// import { map, shareReplay } from 'rxjs/operators';
import { LoginResponse } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/jwt';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadingStateService } from '../loading-state.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'SidebarComponent',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    RouterOutlet,
  ],
})
export class SidebarComponent implements OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private mediaMatcher = inject(MediaMatcher);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loadingService = inject(LoadingStateService);

  isLoading = this.loadingService.state;

  queryParams = toSignal<Params | undefined>(this.route.queryParams);
  searchstring = computed(() => this.queryParams()?.['searchstring'] ?? '');

  login = output();
  logoff = output();

  loginResponse = input.required<LoginResponse>();

  initials = computed(
    () =>
      this.loginResponse()
        ?.userData.preferred_username.split(/[._-]/)
        .map((token: string) => token.charAt(0))
        .join('') as string,
  );

  showCreateButton = computed(() => {
    const loginResponse = this.loginResponse();
    return hasRole('user', loginResponse?.accessToken);
  });

  eventListener = (event: MediaQueryListEvent) => {
    console.log(event.matches);
    this.isHandset.set(event.matches);
  };

  // MediaMatcher example
  isHandset = signal<boolean>(false);
  isHandsetMatcher = this.mediaMatcher
    .matchMedia(Breakpoints.Handset)
    .addEventListener('change', (event) => {
      console.log(event.matches);
      this.isHandset.set(event.matches);
    });

  ngOnDestroy() {
    this.mediaMatcher
      .matchMedia(Breakpoints.Handset)
      .removeEventListener('change', this.eventListener);
  }

  // BreakpointObserver example
  // isHandset = toSignal(
  //   this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //     map((result) => result.matches),
  //     shareReplay(),
  //   ),
  // );

  searchstringChanged(event: Event) {
    const searchstring = (event.target as HTMLInputElement).value;

    this.router.navigate(
      ['overview'],
      searchstring
        ? {
            queryParams: { searchstring },
          }
        : undefined,
    );
  }
}
