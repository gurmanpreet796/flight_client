import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  // Retrieves user token and checks authentication
  authenticate(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', { username, password }).pipe(
      map(userData => {
        sessionStorage.setItem('username', username);
        let tokenStr = 'Bearer ' + userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  // Checks whether the user is logged in
  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  // Removes user session(logout)
  logOut() {
    console.log('Logging out');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Retrieves role of user (customer/admin)
  getRole(username: string): Observable<any> {
    return this.httpClient.get('http://localhost:8080/user/getRole?username=' + username, {responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  // Adds a new User
  signUp(user: User): Observable<any> {
    return this.httpClient.post('http://localhost:8080/user/createUser', user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
