import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services';
import { INode } from 'src/app/shared/interfaces';
import { Node } from 'src/app/shared/models';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit, OnDestroy {
    nodes: INode[] = [];

    subs: Subscription = new Subscription();

    constructor(private _categoriesService: CategoriesService) { }

    ngOnInit(): void {
        this.subs.add(
            this._categoriesService.getAllCategories().subscribe((nodes: INode[]) => {
                this.nodes = nodes.map((x) => new Node(x));
            })
        );
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
