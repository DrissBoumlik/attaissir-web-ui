
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    verify() {
        return this.http.get('/api/verify', this.jwt()).pipe(map((response: Response) => response.json()));
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt()).pipe(map((response: Response) => response.json()));
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).pipe(map((response: Response) => response.json()));
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).pipe(map((response: Response) => response.json()));
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).pipe(map((response: Response) => response.json()));
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).pipe(map((response: Response) => response.json()));
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).pipe(map((response: Response) => response.json()));
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser.data && currentUser.data.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.data.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
