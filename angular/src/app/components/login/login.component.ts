import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService

  ) { }

  ngOnInit() {
  }
OturumAc(uyeMail:string, parola:string){
  this.apiServis.tokenAl(uyeMail, parola).subscribe((d:any) =>{
    localStorage.setItem("token",d.access_token);
    localStorage.setItem("uid", d.uyeId);
    localStorage.setItem("uyeMail",d.uyeMail);
    localStorage.setItem("uyeAdsoyad",d.uyeAdsoyad);
    localStorage.setItem("uyeYetkileri", d.uyeYetkileri);
    location.href = "/";


  },err =>{
    var s: Sonuc = new Sonuc();
    s.islem=false;
    s.mesaj="Mail veya Parola Hatalı!"
    this.alert.AlertUygula(s);
  }
);
  }
}