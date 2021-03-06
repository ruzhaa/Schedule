import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory, INode, ISession } from 'src/app/shared/interfaces';
import { Session } from 'src/app/shared/models';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    constructor(private _http: HttpClient) {}

    getAllCategories(): Observable<INode[]> {
        return this._http.get('/categories/list/').pipe(map((response) => response['results']));
    }

    getSessionsForCategory(category: ICategory): Observable<ISession[]> {
        return this._http
            .get(`/categories/${category.slug}/retrieve/`)
            .pipe(map((sessions: ISession[]) => sessions.map((x) => new Session(x))));
    }

    getAllSessions(leaf_categories: ICategory[]): Observable<ISession[][]> {
        return forkJoin(leaf_categories.map((category: ICategory) => this.getSessionsForCategory(category)));
    }
}
