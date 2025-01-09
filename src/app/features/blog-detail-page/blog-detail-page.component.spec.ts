import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailPageComponent } from './blog-detail-page.component';

describe('BlogDetailPageComponent', () => {
  let component: BlogDetailPageComponent;
  let fixture: ComponentFixture<BlogDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlogDetailPageComponent],
    });
    fixture = TestBed.createComponent(BlogDetailPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('id', 1);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
