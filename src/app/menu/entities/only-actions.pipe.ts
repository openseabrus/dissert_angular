import { Pipe, PipeTransform } from '@angular/core';
import { Entity } from './entity';
import { EntityAttribute } from './attribute/entity-attribute';

/**
 * This is a test anotation :D
 */
@Pipe({name: 'onlyActions'})
export class OnlyActions implements PipeTransform {
	transform(entities: Entity[]): Entity[] {
		if (!entities) {
			return entities;
		}

		// filter items array, items which match and return true will be
		// kept, false will be filtered out
		console.log('Pipe', entities);
		return entities.filter(entity => {
			return entity.attributes.some(attribute => attribute.asAction);
		});
	}
}

@Pipe({name: 'onlyActionAttributes'})
export class OnlyActionAttributes implements PipeTransform {
	transform(attributes: any[]): any[] {
		if (!attributes) {
			return null;
		}

		return attributes.filter(attribute => attribute.asAction);
	}
}
