import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleCategiesService {
    routeName: string;

    constructor(private http: HttpClient) {
        this.routeName = 'articlecategories';
    }

    /**
     * Get a collection of Article
     * @returns {Observable<any[]>}
     */
    getArticleCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/${this.routeName}`);
    }

    /**
     * Get a Article
     * @returns {Observable<any>}
     */
    getArticle(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/${id}`);
    }

    getArticleSubCategories(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/subcategories/${id}`);
    }

    /**
     * Get a collection of Article variables to be used in dropdowns in forms
     * @returns {Observable<any[]>}
     */
    /*getArticleCategoriesVars(): Observable<any> {
      return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/vars`);
    }*/

    /**
     * Get a collection of Article
     * @returns {Observable<any[]>}
     */
    getArticleCategoriesDx(params?: any): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

}
