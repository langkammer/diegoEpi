import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Ambiente } from '../ambiente/ambiente';
import { AmbienteService } from '../ambiente/ambiente.service';

@Component({
  selector: 'app-ambiente-list',
  templateUrl: './ambiente-list.component.html',
  styleUrls: ['./ambiente-list.component.css']
})
export class AmbienteListComponent implements OnInit {

  ambientes: Ambiente[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private ambienteService: AmbienteService
  ) { }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.ambientes = this.activatedRoute.snapshot.data['ambientes'];
  }

  load() {
    this.ambienteService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.ambientes = this.ambientes.concat(photos);
        if(!photos.length) this.hasMore = false;
      });
  }
}
