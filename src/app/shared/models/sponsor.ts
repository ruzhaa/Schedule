import { ISponsor } from '../interfaces';

export class Sponsor implements ISponsor {
    name: string;
    url: string;
    dark_background_logo: string;
    light_background_logo: string;

    constructor(data?: ISponsor) {
        if (data) {
            if (data['name']) this.name = data.name;
            if (data['url']) this.url = data.url;
            if (data['dark_background_logo']) this.dark_background_logo = data.dark_background_logo;
            if (data['light_background_logo']) this.light_background_logo = data.light_background_logo;
        }
    }
}
