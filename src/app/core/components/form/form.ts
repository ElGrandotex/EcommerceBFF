import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../services/category';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  private fb = inject(FormBuilder);
  private categoryService = inject(Category);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
  });

  get name() {
    return this.form.get('name');
  }

    loading = false;
  error = '';
  isEdit = false;

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';
      const categoryData = {
        name: this.form.value.name || ''
      };
      this.categoryService.createCategory(categoryData).subscribe({
        next: () => {
          this.loading = false;
          alert('Categoría creada exitosamente');
        },
        error: (err) => {
          console.error('Error creating category:', err);
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/table']);
  }

}
