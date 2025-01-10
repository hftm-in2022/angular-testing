import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  Blog,
  BlogOverviewCardComponent,
} from './blog-overview-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ShareDirective } from '../share/share.directive';
import { MockDirective } from 'ng-mocks';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('BlogOverviewCardComponent', () => {
  let component: BlogOverviewCardComponent;
  let fixture: ComponentFixture<BlogOverviewCardComponent>;
  let routerMock: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
      ],
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MockDirective(ShareDirective),
        BlogOverviewCardComponent,
      ],
    });
    fixture = TestBed.createComponent(BlogOverviewCardComponent);
    component = fixture.componentInstance;
    routerMock = TestBed.inject(Router);
    routerMock.initialNavigation();

    fixture.componentRef.setInput('index', 1);
    fixture.componentRef.setInput('routeCommands', ['/path', 1]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
     fixture.componentRef.setInput('model', {title: 'Test'});
     fixture.detectChanges();
     const element: HTMLElement = fixture.debugElement.query(By.css('[data-testid="title"]')).nativeElement;
     expect(element.innerText).toBe('Test');
  });

  it('should show the like button in black when likedByMe is false', () => {
    // arrange
    fixture.componentRef.setInput('model', {likedByMe: false});
    fixture.detectChanges();

    // act
    const likeButton: HTMLElement = fixture.debugElement.query(By.css('[data-testid="like-button-icon"]')).nativeElement;

    // assert
    expect(likeButton.style['color']).toBe('black');

  });

  it('should show the like button in red when likedByMe is true', () => {
    // arrange
    fixture.componentRef.setInput('model', {likedByMe: true});
    fixture.detectChanges();

    // act
    const likeButton: HTMLElement = fixture.debugElement.query(By.css('[data-testid="like-button-icon"]')).nativeElement;

    // assert
    expect(likeButton.style['color']).toBe('red');
  });

  it('should navigate to a certain blog when the image or header is clicked', () => {
    // arrange
    fixture.componentRef.setInput('model', {title: 'Test'});
    fixture.detectChanges();
    const routerSpy = spyOn(routerMock, 'navigateByUrl');

    const imageElement = fixture.debugElement.query(By.css('[data-testid="title"]'));
    
    // act
    imageElement.nativeElement.click();

    // assert
    const urlTree: UrlTree = routerMock.createUrlTree(['/path', 1]);
    expect(routerSpy).toHaveBeenCalledWith(urlTree, jasmine.any(Object));


  });
});
