import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http , Headers, RequestOptions,  Response} from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthenticationService } from './authentication.service';

const API_URL = environment.apiUrl;


@Injectable()
export class ApiService {

  constructor( private http: Http ,  private authenticationService: AuthenticationService ) {
  }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {    
    let headers = new Headers({ 'X-Auth-Token': ' ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
		
    return this.http
    .get(API_URL + '/todos', options)
    .map(response => {
      const todos = response.json();
      return todos.map((todo) => new Todo(todo));
    })
    .catch(this.handleError);
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
  
     let headers = new Headers({ 'X-Auth-Token': ' ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http
    .post(API_URL + '/todos', todo , options)
    .map(response => {
      return new Todo(response.json());
    })
    .catch(this.handleError);
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo>  {
    let headers = new Headers({ 'X-Auth-Token': ' ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http
     .get(API_URL + '/todos/' + todoId, options)
     .map(response => {
       return new Todo(response.json());
     })
     .catch(this.handleError);
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    let headers = new Headers({ 'X-Auth-Token': ' ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http
     .put(API_URL + '/todos/' + todo.id, todo, options)
     .map(response => {
       return new Todo(response.json());
     })
     .catch(this.handleError);
  }

  // DELETE /todos/:id
  public  deleteTodoById(todoId: number): Observable<null>  {
    let headers = new Headers({ 'X-Auth-Token': ' ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http
    .delete(API_URL + '/todos/' + todoId ,options)
    .map(response => null)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
  console.error('ApiService::handleError', error);
  return Observable.throw(error);
  }

}
