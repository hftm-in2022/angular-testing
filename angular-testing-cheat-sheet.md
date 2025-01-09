# Angular Testing Cheat Sheet

## 1. Configuring a TestBed
The `TestBed` is used to configure the testing module and initialize the component for testing.
```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [MyModule],         // Components to test (standalone=true), 
    providers: [MyService],      // Services or providers used
  });
});
```

## 2. Creating a Component Fixture
```typescript
let fixture: ComponentFixture<MyComponent>;
let component: MyComponent;

beforeEach(() => {
  fixture = TestBed.createComponent(MyComponent);
  component = fixture.componentInstance;
});
```

## 3. Mocking Components, Services, and Pipes
### Mocking a Component
```typescript
import { MockComponent } from 'ng-mocks';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [MockComponent(ChildComponent)],
  });
});
```

### Mocking a Service
```typescript
import { MockProvider } from 'ng-mocks';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [MockProvider(MyService, { myMethod: () => of('mockValue') })],
  });
});
```

### Mocking a Pipe
```typescript
import { MockPipe } from 'ng-mocks';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [MockPipe(MyPipe, value => `Mocked: ${value}`)], // for standalone pipes
  });
});
```

## 4. Setting Component Inputs
```typescript
fixture.componentRef.setInput('myInput', 'value'); // for signal inputs
```

## 5. Triggering Click Events
```typescript
const button = fixture.debugElement.query(By.css('button')).nativeElement;
button.click();
fixture.detectChanges();
```

## 6. Setting Input Values
```typescript
const input = fixture.debugElement.query(By.css('input')).nativeElement;
input.value = 'new value';
input.dispatchEvent(new Event('input'));
fixture.detectChanges();
```

## 7. Querying the DOM
### Query a Single Element
```typescript
const element = fixture.debugElement.query(By.css('.my-class'));
```

### Query Multiple Elements
```typescript
const elements = fixture.debugElement.queryAll(By.css('.my-class'));
```

### Using `data-testid` Attributes for Selectors
Using `data-testid` attributes simplifies DOM queries in your tests, making them more robust against style or structural changes.

#### Example
```typescript
const debugEl: HTMLElement = fixture.debugElement.query(
  By.css('[data-testid="title"]'),
).nativeElement;
expect(debugEl.innerText).toBe('Expected Title');
```

This approach is especially useful for querying elements with a clear, test-specific identifier.

## 8. Testing Outputs and Events
### Trigger Event
```typescript
const child = fixture.debugElement.query(By.directive(ChildComponent));
child.triggerEventHandler('eventName', eventValue);
```

### Listen to Output
```typescript
spyOn(component.outputEvent, 'emit');
component.someMethod();
expect(component.outputEvent.emit).toHaveBeenCalledWith(expectedValue);
```

## 9. Testing Router Navigation
### Spy on `Router` Navigate
```typescript
const router = TestBed.inject(Router);
const navigateSpy = spyOn(router, 'navigateByUrl');

component.navigate();

expect(navigateSpy).toHaveBeenCalledWith('/expected-path');
```

### Using `jasmine.any(Object)` for Any Arguments
`jasmine.any(Object)` is a flexible matcher that allows you to verify calls to a method where one or more arguments can be of any object type. This is particularly useful when you are not concerned with the exact structure of the object being passed.

#### Example
```typescript
const urlTree: UrlTree = routerMock.createUrlTree(['/path', 1]);
expect(navigateSpy).toHaveBeenCalledWith(urlTree, jasmine.any(Object));
```

Here, the second argument can be any object, allowing you to focus on verifying other critical parts of the call.

#### Advanced Example
```typescript
expect(mySpy).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(String));
```
This verifies that the method was called with an object as the first argument and a string as the second argument.

### Mock `ActivatedRoute`
```typescript
providers: [
  {
    provide: ActivatedRoute,
    useValue: {
      queryParams: of({ param1: 'value' }),
    },
  },
],
```

### Mock `ActivatedRoute` using ng-mocks
```typescript
providers: [
  MockProvider(ActivatedRoute,
    useValue: {
      queryParams: of({ param1: 'value' }),
    },
  ),
],
```


## 10. Verifying Styles
```typescript
const element = fixture.debugElement.query(By.css('.my-element'));
expect(element.styles['color']).toBe('red');
```

## 11. Detecting Changes
Always call `fixture.detectChanges()` after a change in the component or its dependencies.
```typescript
fixture.detectChanges();
```

## 12. Using `ngMocks` for Advanced Testing
### Find Components
```typescript
const components = ngMocks.findAll('ChildComponent');
expect(components.length).toBe(2);
```

### Trigger Event on Mocked Component
```typescript
const child = ngMocks.find('ChildComponent');
child.triggerEventHandler('outputEvent', { key: 'value' });
```

This cheat sheet provides the necessary techniques for creating unit tests for Angular components, including setup, mocking, event handling, and assertions. Use it as a guide for writing clean and effective tests!

