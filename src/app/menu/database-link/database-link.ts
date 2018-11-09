import { Url } from 'url';

export class DatabaseLink {
    _id?: 'string';
    link: Url;
    setDate?: Date;

    constructor(link: Url, date?: Date) {
        this.link = link;
        this.setDate = date;
    }
}
