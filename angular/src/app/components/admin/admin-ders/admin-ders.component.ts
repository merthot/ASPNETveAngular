import { ActivatedRoute } from '@angular/router';
import { Kategori } from './../../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { DersDialogComponent } from '../../dialogs/ders-dialog/ders-dialog.component';

@Component({
  selector: 'app-admin-ders',
  templateUrl: './admin-ders.component.html',
  styleUrls: ['./admin-ders.component.css']
})
export class AdminDersComponent implements OnInit {

  dersler: Ders[];
  kategoriler: Kategori[];
  secKat: Kategori;
  katId: number;
  dataSource: any;
  displayedColumns=['dersKodu','dersAdi','dersSaati','dersUyeSayisi','islemler']
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<DersDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();

    this.route.params.subscribe(p =>{
      
      if(p.katId){
        this.katId=p.katId;
        this.KategoriById();  
        this.DersListele();  
      }

    });
  }

  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
      this.secKat=d;
    });
  }

  DersListele() {
    this.apiServis.DersListeByKatId(this.katId).subscribe((d:Ders[])=>{
    this.dersler=d;
    this.dataSource=new MatTableDataSource(d);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
    });
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
    });
  }

  KategoriSec(kat:Kategori){
    this.katId = kat.katId;
    this.DersListele();
  }

  Ekle() {
    var yeniKayit: Ders = new Ders();
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "400px",
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersEkle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });
  }
  Duzenle(kayit: Ders) {
    this.dialogRef = this.matDialog.open(DersDialogComponent, {
      width: "400px",
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        d.dersId=kayit.dersId
        this.apiServis.DersDuzenle(kayit).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
          }
        });
      }
    });

  }
  Sil(kayit: Ders) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "500px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.dersAdi + " Ders Silinecektir Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.DersSil(kayit.dersId).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersListele();
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



