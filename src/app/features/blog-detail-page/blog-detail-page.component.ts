import { Component, input } from '@angular/core';

@Component({
  selector: 'BlogDetailPageComponent',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.scss'],
  standalone: true,
})
export class BlogDetailPageComponent {
  id = input.required<number>();
}
