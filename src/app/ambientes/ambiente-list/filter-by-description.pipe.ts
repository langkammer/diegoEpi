import { Pipe, PipeTransform } from '@angular/core';
import { Ambiente } from '../ambiente/ambiente';


@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {

    transform(ambiente: Ambiente[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        if(descriptionQuery) {
            return ambiente.filter(photo => 
                photo.descricao.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return ambiente;
        }
    }

}