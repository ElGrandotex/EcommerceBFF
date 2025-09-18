import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Category } from '../../services/category';
import { tap, catchError, of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  categories = signal<Category[]>([]);
  loading = signal(false);
  error = signal('');
  today = new Date();

  private categoryService = inject(Category);

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.error.set('');

    this.categoryService
      .getCategories()
      .pipe(
        tap({
          next: (data) => {
            this.categories.set(data);
            this.loading.set(false);
          },
          error: (err) => {
            this.error.set('Error al cargar las categorías: ' + err.message);
            this.loading.set(false);
            console.error('Error loading categories:', err);
          },
        }),
        catchError((err) => {
          this.error.set('Error al cargar las categorías: ' + err.message);
          this.loading.set(false);
          return of([]);
        })
      )
      .subscribe();

      console.log('Categories loaded:', this.categories());

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  refresh(): void {
    this.loadCategories();
  }
}
