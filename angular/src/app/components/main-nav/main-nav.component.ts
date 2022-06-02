import { Sonuc } from './../../models/Sonuc';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from './../dialogs/uye-dialog/uye-dialog.component';
import { Uye } from './../../models/Uye';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  uyeler: Uye[];
  uyeId: string;
  UyeId = localStorage.getItem("uid");
  yeniKayit:Uye;
  mail:string;
  kategoriler:Kategori[];
  dialogRef: MatDialogRef<UyeDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public apiServis:ApiService,
              public matDialog: MatDialog,
              public alert: MyAlertService,
              public route: ActivatedRoute
    ) {}
  ngOnInit(): void {
    this.KategoriListele();
    if (this.apiServis.oturumKontrol){
    this.mail=localStorage.getItem("uyeMail");
   }
  }

  OturumKapat(){
    localStorage.clear();
    location.href="/";
  }

  UyeEkle(){
    var yenikayit:Uye = new Uye();
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
    width:'300px',
    data:{
      kayit: yenikayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
  if(d){
    yenikayit = d;
    yenikayit.uyeId = this.uyeId;
    this.apiServis.UyeEkle(yenikayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);

    });
  }
  });
  }

  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
    this.kategoriler=d;
    });
  }
}