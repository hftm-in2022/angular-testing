import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogStateService } from './state/blog-state.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

type CreatedBlog = {
  title: string;
  content: string;
};

type BlogFormGroup = FormGroup<{
  title: FormControl<string | null>;
  content: FormControl<string | null>;
}>;

@Component({
  selector: 'AddBlogPageComponent',
  templateUrl: './add-blog-page.component.html',
  styleUrls: ['./add-blog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AddBlogPageComponent {
  protected form!: BlogFormGroup;
  protected blogStateService = inject(BlogStateService);

  submitButtonDisabled = signal<boolean>(false);

  constructor() {
    this.form = new FormGroup({
      title: new FormControl<string | null>(
        'an existing title',
        [
          Validators.required,
          Validators.pattern('^[A-Z]+(.)*'),
          this.customValidator,
        ],
        this.customAsyncValidator,
      ),
      content: new FormControl<string | null>(null, [Validators.required]),
    });
  }

  async onSubmit() {
    console.log(this.form);
    //this.validateAllFormFields(this.form);

    if (this.form.valid) {
      this.submitButtonDisabled.set(true);
      this.blogStateService.addBlog(this.form.value as CreatedBlog);
    }
  }

  private customValidator(
    control: FormControl<string | null>,
  ): ValidationErrors | null {
    if (control.value === 'Test') {
      return { custom: true };
    }
    return null;
  }

  private customAsyncValidator(
    control: AbstractControl,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'Test Async') {
          resolve({ customAsync: true });
        }
        resolve(null);
      });
    });
  }

  private validateAllFormFields(formGroup: BlogFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
