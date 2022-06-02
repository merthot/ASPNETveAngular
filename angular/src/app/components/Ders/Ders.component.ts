import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-Ders',
  templateUrl: './Ders.component.html',
  styleUrls: ['./Ders.component.scss']
})
export class DersComponent implements OnInit {
  dersId: string;
  Ders: Ders;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p.dersId){
        this.dersId = p.dersId;
        this.DersById();
      }
    });
  }

  DersById(){
    this.apiServis.DersById(this.dersId).subscribe((d:Ders)=>{
      this.Ders = d;
    });

  }

}
