import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'view',
    },
    {
        path: 'view',
        component: ScheduleViewComponent,
    },
    {
        path: 'list',
        component: ScheduleListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ScheduleRoutingModule {}
