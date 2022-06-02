import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dersler: Ders[];
  constructor(
    public apiServis: ApiService
  ) { }

  ngOnInit() {
    this.SonEklenenler();

  }

  SonEklenenler(){
    this.apiServis.DersListeSonEklenenler(5).subscribe((d:Ders[])=>{
      this.dersler = d;
    });
  }

}
