import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Article } from '../../../shared/classes/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  routeName: string;

  constructor(private http: HttpClient) {
    this.routeName = 'articles';
  }

  /**
   * Get a collection of Article
   * @returns {Observable<Article[]>}
   */
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.apiUrl}/${this.routeName}`);
  }

  /**
   * Get a Article
   * @returns {Observable<Article>}
   */
  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${environment.apiUrl}/${this.routeName}/${id}`);
  }

  /**
   * Get a collection of Article variables to be used in dropdowns in forms
   * @returns {Observable<Article[]>}
   */
  /*getArticlesVars(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.routeName}/vars`);
  }*/

  /**
   * Get a collection of Article
   * @returns {Observable<Article[]>}
   */
  getArticlesDx(params?: any): Observable<Article[]> {
    return this.http.post<Article[]>(`${environment.apiUrl}/${this.routeName}/grid`, JSON.stringify(params), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
