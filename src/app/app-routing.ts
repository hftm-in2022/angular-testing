import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import {
  BlogBackendService,
  Entries,
  ErrorPageComponent,
  PageNotFoundPageComponent,
  isAuthenticatedGuard,
} from './core';

import { lastValueFrom } from 'rxjs';

export const entriesResolver: ResolveFn<Entries> = async (route) => {
  const queryParams = route?.queryParams;
  const blogBackendService = inject(BlogBackendService);
  return await lastValueFrom(blogBackendService.getBlogPosts(queryParams));
};

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./features/blog-overview-page/blog-overview-page.component').then(
        (c) => c.BlogOverviewPageComponent,
      ),
    resolve: { model: entriesResolver },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/blog-detail-page/blog-detail-page.routes'),
  },
  {
    path: 'add-blog',
    loadChildren: () => import('./features/add-blog-page/add-blog-page.routes'),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  { path: '**', component: PageNotFoundPageComponent },
];
