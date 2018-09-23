import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import {User} from './user';
//import 'rxjs/add/operator/map';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User[];
  constructor(private http:Http) { }
  getUser(){
    //return this.http.get('/http://localhost:3000/api/login/').map(res=>res.json());
    return this.http.get('http://localhost:3000/api/login');
    //.pipe(map(res => res.json()));
  }
}
