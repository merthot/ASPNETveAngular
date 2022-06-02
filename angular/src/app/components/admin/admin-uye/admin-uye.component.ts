import { UyeDialogComponent } from './../../dialogs/uye-dialog/uye-dialog.component';
import { MyAlertService } from './../../../services/myAlert.service';
import { Sonuc } from './../../../models/Sonuc';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {
  dataSource: any;
  kayitlar: Uye[];
  displayedColumns = ['uyeAdsoyad', 'uyeMail','uyeDersSayisi', 'uyeAdmin', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UyeDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.KayitGetir();
  }

  KayitGetir() {
    this.apiServis.UyeListe().subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  UyeEkle() {
    var yeniKayit = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "400px",
      data: {
        islem: 'ekle',
        kayit: yeniKayit
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.uyeFoto = "profil.jpg";
        this.apiServis.UyeEkle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  UyeDuzenle(uye: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        kayit: uye
      }
    });

    this.dialogRef.afterClosed().subscribe((d: Uye) => {
      if (d) {
        uye.uyeMail = d.uyeMail;
        uye.uyeAdsoyad = d.uyeAdsoyad;
  


        this.apiServis.UyeDuzenle(uye).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });
  }
  UyeSil(uye: Uye) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = uye.uyeAdsoyad + " isimli Üye Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.UyeSil(uye.uyeId).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitGetir();
          }
        });
      }
    });

  }

  

  Filtrele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
