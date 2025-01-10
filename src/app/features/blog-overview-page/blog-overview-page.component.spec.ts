import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOverviewPageComponent } from './blog-overview-page.component';
import { Blog, BlogOverviewCardComponent } from '../../shared';
import { MockComponent, MockProvider, ngMocks } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlogBackendService } from '../../core';

describe('BlogOverviewPageComponent', () => {
  let component: BlogOverviewPageComponent;
  let fixture: ComponentFixture<BlogOverviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ searchstring: 1 }),
          },
        },
        MockProvider(BlogBackendService),
      ],
      imports: [
        BlogOverviewPageComponent,
        MockComponent(BlogOverviewCardComponent),
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(BlogOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('model', {
      data: [{ id: 1 }, { id: 2 }] as Blog[],
      pageIndex: 0,
      pageSize: 2,
      totalCount: 2,
      maxPageSize: 5,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke the likeBlog function when the likeBlog event handler is triggered', () => {
    const spy = spyOn(component, 'likeBlog');

    const blogOverviewCardComponent = ngMocks.find(BlogOverviewCardComponent);
    blogOverviewCardComponent.triggerEventHandler('likeBlog', { id: 1, likedByMe: false });

    expect(spy).toHaveBeenCalledWith({ id: 1, likedByMe: false });



  });

  it('should render a BlogOverviewCardComponent for each blog', () => {
    // TODO: implement
  });
});
