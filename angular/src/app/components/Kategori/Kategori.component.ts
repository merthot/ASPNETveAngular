import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-Kategori',
  templateUrl: './Kategori.component.html',
  styleUrls: ['./Kategori.component.scss']
})
export class KategoriComponent implements OnInit {
  dersler: Ders[];
  katId: number;
  kat: Kategori;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p.katId){
        this.katId = p.katId;
        this.KategoriById();
        this.DersListeByKatId();
      }
    });
  }

  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
      this.kat = d;
    })

  }

  DersListeByKatId(){
    this.apiServis.DersListeByKatId(this.katId).subscribe((d:Ders[])=>{
      this.dersler = d;
    });

  }

}
