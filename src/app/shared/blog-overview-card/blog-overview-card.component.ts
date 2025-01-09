import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ShareDirective } from '../share';
import { NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

export type Blog = {
  author: string;
  comments: number;
  contentPreview: string;
  createdByMe: boolean;
  id: number;
  likedByMe: boolean;
  likes: number;
  title: string;
};

@Component({
  selector: 'BlogOverviewCardComponent',
  templateUrl: './blog-overview-card.component.html',
  styleUrls: ['./blog-overview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    NgStyle,
    ShareDirective,
  ],
})
export class BlogOverviewCardComponent {
  model = input.required<Blog>();
  index = input.required<number>();
  routeCommands = input.required<[string, number]>();

  likeBlog = output<{
    id: number;
    likedByMe: boolean;
  }>();
}
