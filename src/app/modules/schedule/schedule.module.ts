import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ScheduleViewComponent],
    imports: [CommonModule, ScheduleRoutingModule, SharedModule],
})
export class ScheduleModule {}
