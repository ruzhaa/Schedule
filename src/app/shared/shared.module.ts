import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleLogPipe } from './pipes';

@NgModule({
    declarations: [ConsoleLogPipe],
    imports: [CommonModule],
    exports: [ConsoleLogPipe],
})
export class SharedModule {}
