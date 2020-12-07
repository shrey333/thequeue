import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private http: HttpClient) {
  }

  baseUri = 'http://localhost:3000/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  LogOut: void;

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usertoken');
  }

  getToken() {
    return localStorage.getItem('usertoken');
  }

  // Create
  createUser(data): Observable<any> {
    const url = `${this.baseUri}`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  findUser(data): Observable<any> {
    const url = `${this.baseUri}/find`;
    return this.http.post(url, data).
      pipe(
        catchError(this.errorMgmt)
    );
  }

  // login user
  loginUser(data): Observable<any> {
    const url = `${this.baseUri}/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get user
  public getUser(id): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update user
  updateUser(id, data): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http.put(url, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete user
  deleteUser(id): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http.delete(url, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('usertoken');
    console.log('User logged out successfully');
    this.router.navigateByUrl('/login');
  }

  checkEmailNotTaken(email: string) {
    const url = `${this.baseUri}/check`;
    return this.http.post(url, {
      email
    });
  }
}
