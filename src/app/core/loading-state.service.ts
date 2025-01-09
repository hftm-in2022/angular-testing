import { Injectable, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService {
  #state = signal<boolean>(false);
  state = this.#state.asReadonly();

  private router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.#state.set(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.#state.set(false);
          break;
        }
      }
    });
  }

  setLoadingState(value: boolean) {
    this.#state.set(value);
  }
}
