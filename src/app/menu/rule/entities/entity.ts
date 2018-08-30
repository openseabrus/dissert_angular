export class Entity {
    _id?: string;
    name: string;
    attributes: [{
        name: string,
        type: string,
        unit: string,
        asAction?: boolean
    }];
}
