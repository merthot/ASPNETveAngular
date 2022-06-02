import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Kayit } from 'src/app/models/Kayit';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ders-listele',
  templateUrl: './ders-listele.component.html',
  styleUrls: ['./ders-listele.component.css']
})
export class DersListeleComponent implements OnInit {

  secUye: Uye;
  uyeId: string;
  dersId: string = "";
  kayitlar: Kayit[];
  dersler: Ders[];
  displayedColumns = ['dersKodu', 'dersAdi', 'dersSaati', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.uyeId = p.uyeId;
        this.UyeGetir();
        this.KayitListele();
        this.DersListele();
      }
    });
  }

  UyeGetir() {
    this.apiServis.UyeById(this.uyeId).subscribe((d:Uye) => {
      this.secUye = d;
    });
  }

  KayitListele(){
    this.apiServis.UyeDersListe(this.uyeId).subscribe((d:Kayit[]) => {
      this.kayitlar= d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  DersListele(){
    this.apiServis.DersListe().subscribe((d:Ders[]) => {
      this.dersler = d;
    });
  }

  DersSec(dersId:string){ 
    this.dersId=dersId;

  }

  Kaydet() {
    console.log(this.dersId);
    if (this.dersId == ""){
      var s:Sonuc=new Sonuc();
      s.islem=false;
      s.mesaj="Ders Seçiniz";
      this.alert.AlertUygula(s);

    return false;

    }

    var kayit:Kayit=new Kayit();
    kayit.kayitDersId=this.dersId;
    kayit.kayitUyeId=this.uyeId;

    this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);
      if(s.islem){
        this.KayitListele();
        
      }
      
    });
  }

  Sil(kayit:Kayit){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dersBilgi.dersAdi + "Dersi Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KayitListele();
      }
        });
      }
    });

  }

}
