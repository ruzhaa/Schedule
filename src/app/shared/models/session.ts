import { environment } from 'src/environments/environment';
import { ISession } from '../interfaces';

export class Session implements ISession {
    start: Date;
    end: Date;
    category__slug: string;
    title: string;
    id: number;

    constructor(data?: ISession) {
        if (data['start']) this.start = new Date(data.start);
        if (data['end']) this.end = new Date(data.end);
        if (data['category__slug']) this.category__slug = data.category__slug;
        if (data['title']) this.title = data.title;
        if (data['id']) this.id = data.id;
    }

    duration(): number {
        return (this.end.getTime() - this.start.getTime()) / (environment.SLOT_DURATION * 60 * 1000);
    }
}
