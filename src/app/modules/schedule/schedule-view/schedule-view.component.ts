import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services';
import { ICategory, INode, ISession } from 'src/app/shared/interfaces';
import { Session } from 'src/app/shared/models';

@Component({
    selector: 'app-schedule-view',
    templateUrl: './schedule-view.component.html',
    styleUrls: ['./schedule-view.component.scss'],
})
export class ScheduleViewComponent implements OnInit {
    leaf_categories: ICategory[] = [];
    sessions: ISession[] = [];

    constructor(private _categorisService: CategoriesService) {}

    ngOnInit(): void {
        this._categorisService.getAllCategories().subscribe((response) => {
            for (const node of response['results']) {
                this.getLeafCategories(node);
            }

            this._categorisService.getAllSessions(this.leaf_categories).subscribe((category_sessions: ISession[][]) => {
                category_sessions.forEach((category_session: ISession[]) => {
                    category_session.forEach((session: ISession) => {
                        this.sessions.push(new Session(session));
                    });
                });
            });
        });
    }

    getLeafCategories(node: INode) {
        if (node.is_final_category) {
            this.leaf_categories.push(node.category);
            return;
        }

        for (const inner_node of node.subcategories) {
            this.getLeafCategories(inner_node);
        }
    }
}
