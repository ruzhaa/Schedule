import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services';
import { ICategory, INode, ISession } from 'src/app/shared/interfaces';
import { Category, Session } from 'src/app/shared/models';

@Component({
    selector: 'app-schedule-view',
    templateUrl: './schedule-view.component.html',
    styleUrls: ['./schedule-view.component.scss'],
})
export class ScheduleViewComponent implements OnInit, OnDestroy {
    leaf_categories: ICategory[] = [];
    sessions: ISession[] = [];
    slots: { [key: string]: ISession[] } = {};
    sessions_matrix: ISession[][] = [];

    subs: Subscription = new Subscription();

    constructor(private _categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.subs.add(
            this._categoriesService.getAllCategories().subscribe((nodes: INode[]) => {
                for (const node of nodes) this.getLeafCategories(node);

                this._categoriesService
                    .getAllSessions(this.leaf_categories)
                    .subscribe((category_sessions: ISession[][]) => {
                        category_sessions.forEach((category_session: ISession[]) => {
                            category_session.forEach((session: ISession) => {
                                this.sessions.push(new Session(session));
                            });
                        });
                        this.parseSessions();
                        this.parseSessionsMatrix();
                    });
            })
        );
    }

    getLeafCategories(node: INode): void {
        if (node.is_final_category) {
            this.leaf_categories.push(new Category(node.category));
            return;
        }

        for (const inner_node of node.subcategories) this.getLeafCategories(inner_node);
    }

    parseSessions(): void {
        this.slots = this.sessions.reduce((sessions, session) => {
            const start_date = session.start.toISOString();
            const end_date = session.end.toISOString();

            if (!sessions[start_date]) sessions[start_date] = [];

            if (!sessions[end_date]) sessions[end_date] = [];

            sessions[start_date].push(session);
            return sessions;
        }, {});
    }

    sortSlotsSessions(): [string, ISession[]][] {
        // sorted by duration
        Object.entries(this.slots).forEach((slot) => slot[1].sort((a, b) => a.duration() - b.duration()));

        // sorted by slot datetime
        return Object.entries(this.slots).sort(
            (slotA, slotB) => new Date(slotA[0]).getTime() - new Date(slotB[0]).getTime()
        );
    }

    parseSessionsMatrix(): void {
        let row = [];
        let max_rows;

        while (max_rows !== 0) {
            row = [];
            max_rows = 0;
            let previous_node_end: Date;
            let max_count_slots = Object.keys(this.slots).length - 1;

            for (const [key, values] of this.sortSlotsSessions()) {
                const node = values.length ? values[values.length - 1] : undefined;

                if (
                    node &&
                    (!previous_node_end || node.start.getTime() >= previous_node_end.getTime()) &&
                    max_count_slots - node.duration() >= 0
                ) {
                    previous_node_end = node.end;
                    row.push(node);
                    max_count_slots -= node.duration();
                    values.pop();
                } else if (!previous_node_end || previous_node_end.getTime() <= new Date(key).getTime()) row.push({});

                max_rows = values.length > max_rows ? values.length : max_rows;
            }

            this.sessions_matrix.push(row);
        }
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
