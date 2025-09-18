import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CreateCategoryDto } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class Category {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiurl}/bff/Categories`;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

    createCategory(category: CreateCategoryDto): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(id: number, category: CreateCategoryDto): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, category).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Código: ${error.status}, Mensaje: ${error.message}`;
    }

    console.error('Error en CategoryService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
