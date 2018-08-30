import { Pipe, PipeTransform } from '@angular/core';
import { Entity } from './entity';

/**
 * This is a test anotation :D
 */
@Pipe({name: 'onlyActions'})
export class OnlyActions implements PipeTransform {
    transform(entities: Entity[]): Entity[] {
        if (!entities) {
            console.log('Did not enter...');
            return entities;
        }
        console.log('ENTERED');
        console.log(entities);
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return entities.filter(entity => {
            return entity.attributes.some(attribute => attribute.asAction);
        });
    }
}
