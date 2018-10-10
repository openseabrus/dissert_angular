export class Field {
    name?: string;
    type: string;
    unit?: string;

    constructor(name?: string, type?: string, unit?: string) {
        this.name = name;

        if (type) {
            this.type = type;
        } else {
            this.type = 'number';
        }
    }
}
