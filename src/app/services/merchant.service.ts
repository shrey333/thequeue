import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private router: Router, private http: HttpClient) {
  }

  baseUri = 'http://localhost:3000/merchants';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  LogOut: void;

  isLoggedIn(): boolean {
    return !!localStorage.getItem('merchanttoken');
  }

  getToken() {
    return localStorage.getItem('merchanttoken');
  }

  // Create
  createmerchant(data): Observable<any> {
    const url = `${this.baseUri}`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // login merchant
  loginmerchant(data): Observable<any> {
    const url = `${this.baseUri}/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Get merchant
  public getmerchant(id): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }

  // Update merchant
  updatemerchant(id, data): Observable<any> {
    const url = `${this.baseUri}/${id}`;
    return this.http.put(url, data, {headers: this.headers}).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete merchant
  deletemerchant(id): Observable<any> {
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
    localStorage.removeItem('merchant');
    localStorage.removeItem('merchanttoken');
    console.log('Merchant logged out successfully');
    this.router.navigateByUrl('/login');
  }

  checkEmailNotTaken(email: string) {
    const url = `${this.baseUri}/check`;
    return this.http.post(url, {
      email
    });
  }
}
