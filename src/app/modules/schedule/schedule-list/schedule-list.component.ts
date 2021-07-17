import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/core/services';
import { INode } from 'src/app/shared/interfaces';
import { Node } from 'src/app/shared/models';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.component.html',
    styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
    nodes: INode[];

    constructor(private _categorisService: CategoriesService) {}

    ngOnInit(): void {
        this._categorisService.getAllCategories().subscribe((nodes: INode[]) => {
            this.nodes = nodes.map((x) => new Node(x));
        });
    }
}
