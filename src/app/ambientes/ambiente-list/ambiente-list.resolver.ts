import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AmbienteService } from '../ambiente/ambiente.service';
import { Ambiente } from '../ambiente/ambiente';


@Injectable({ providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Ambiente[]>>{

    constructor(private service: AmbienteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ambiente[]> {
        const userName = route.params.userName;
        return this.service.listFromUserPaginated(userName, 1);
    }
}