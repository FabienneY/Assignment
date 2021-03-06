import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})


export class AuthService {

 estconnecte = true;

  constructor (private http: HttpClient){}

  connecte(data): Observable<any>{
    this.estconnecte = true;
    return this.http.post('http://apiauthentification.herokuapp.com/api/auth/connexion',data);
  }


  deconnecte(): Observable<any>{
    this.estconnecte = false;
    return this.http.get('http://apiauthentification.herokuapp.com/api/auth/deconnexion');
  }
}