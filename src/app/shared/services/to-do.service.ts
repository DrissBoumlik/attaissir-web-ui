import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ToDoService {

    routeName: string;

    constructor(private http: HttpClient) {
        this.routeName = 'todos';
    }

    /**
     * @returns {Observable<any>}
     */
    addToDos(todos: number[]): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}`, JSON.stringify({ todos: todos }), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
