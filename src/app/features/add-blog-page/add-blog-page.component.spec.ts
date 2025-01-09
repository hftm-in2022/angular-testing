import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogPageComponent } from './add-blog-page.component';
import { MockProvider } from 'ng-mocks';
import { BlogStateService } from './state/blog-state.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('AddBlogPageComponent', () => {
  let component: AddBlogPageComponent;
  let fixture: ComponentFixture<AddBlogPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(BlogStateService, { state: signal({}) }),
        provideNoopAnimations(),
        provideRouter([]),
      ],
      imports: [MatToolbarModule, MatIconModule, AddBlogPageComponent],
    });
    fixture = TestBed.createComponent(AddBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
