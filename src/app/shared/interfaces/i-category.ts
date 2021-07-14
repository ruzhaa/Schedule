import { ISponsor } from './i-sponsor';

export interface ICategory {
    authenticated_description: string;
    image: string;
    main_sponsor?: ISponsor;
    sessions_count: number;
    slug: string;
    sponsors: ISponsor[];
    title: string;
    unauthenticated_description: string;
}
