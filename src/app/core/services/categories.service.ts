import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory, ISession } from 'src/app/shared/interfaces';
import { Session } from 'src/app/shared/models';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    constructor(private _http: HttpClient) { }

    getAllCategories() {
        return this._http.get('/categories/list/').pipe(
            map((response) => {
                return response;
            })
        );
    }

    getSessionsForCategory(category: ICategory): Observable<ISession[]> {
        return this._http.get(`/categories/${category.slug}/retrieve/`).pipe(
            map((sessions: ISession[]) => {
                return sessions.map(x => new Session(x));
            })
        )
    }

    getAllSessions(leaf_categories: ICategory[]): Observable<ISession[][]> {
        return forkJoin(leaf_categories.map((category: ICategory) => this.getSessionsForCategory(category)));
    }
}
