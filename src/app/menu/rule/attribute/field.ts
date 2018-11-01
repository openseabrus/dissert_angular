export class Field {
    name?: string;
    type: string;
    unit?: string;
    value?: any;

    constructor(name?: string, type?: string, unit?: string, value?: any) {
        this.name = name;

        if (type) {
            this.type = type;
        } else {
            this.type = 'number';
        }

        if (value) {
            this.value = value;
        }   else {
            this.value = null;
        }
    }
}
