import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BlogOverviewCardComponent } from '../../shared';
import { BlogBackendService } from '../../core';
import { lastValueFrom } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

type Model = {
  data: {
    id: number;
    title: string;
    contentPreview: string;
    author: string;
    likes: number;
    comments: number;
    likedByMe: boolean;
    createdByMe: boolean;
    headerImageUrl?: string | undefined;
  }[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
};

@Component({
  selector: 'BlogOverviewPageComponent',
  templateUrl: './blog-overview-page.component.html',
  styleUrls: ['./blog-overview-page.component.scss'],
  standalone: true,
  imports: [BlogOverviewCardComponent, MatPaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogOverviewPageComponent {
  pageSize = 20;
  pageSizes = [5, 10, 20, 50];

  model = model.required<Model>();

  route = inject(ActivatedRoute);
  router = inject(Router);
  blogBackendService = inject(BlogBackendService);
  snackBar = inject(MatSnackBar);

  queryParams = toSignal<Params | undefined>(this.route.queryParams);

  async likeBlog(event: { id: number; likedByMe: boolean }) {
    try {
      await lastValueFrom(
        this.blogBackendService.likeBlog(event.id, event.likedByMe),
      );
      const blogState = this.model();

      if (blogState) {
        const index = blogState?.data.findIndex((b) => b.id === event.id);
        const newState = { ...blogState };

        newState.data[index] = {
          ...blogState.data[index],
          likedByMe: !event.likedByMe,
        };
        this.model.set(newState);
      }
    } catch (error) {
      this.snackBar.open('You must be logged in to like blogs', 'Close', {
        duration: 3000,
      });
    }
  }

  handlePageEvent(event: PageEvent) {
    const { pageSize, pageIndex } = event;
    const searchstring = this.queryParams()?.['searchstring'];

    this.router.navigate(['overview'], {
      queryParams: { searchstring, pageIndex, pageSize },
    });
  }
}
