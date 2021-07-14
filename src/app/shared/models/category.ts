import { ICategory, ISponsor } from '../interfaces';
import { Sponsor } from './sponsor';

export class Category implements ICategory {
    authenticated_description: string;
    image: string;
    main_sponsor?: ISponsor;
    sessions_count: number;
    slug: string;
    sponsors: ISponsor[];
    title: string;
    unauthenticated_description: string;

    constructor(data?: ICategory) {
        if (data) {
            if (data['authenticated_description']) this.authenticated_description = data.authenticated_description;
            if (data['image']) this.image = data.image;
            if (data['main_sponsor']) this.main_sponsor = new Sponsor(data.main_sponsor);
            if (data['sessions_count']) this.sessions_count = data.sessions_count;
            if (data['slug']) this.slug = data.slug;
            if (data['sponsors']) this.sponsors = data.sponsors.map(x => new Sponsor(x));
            if (data['title']) this.title = data.title;
            if (data['unauthenticated_description']) this.unauthenticated_description = data.unauthenticated_description;
        }
    }
}