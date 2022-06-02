import { Sonuc } from 'src/app/models/Sonuc';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Kayit } from 'src/app/models/Kayit';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UyesecDialogComponent } from '../dialogs/uyesec-dialog/uyesec-dialog.component';

@Component({
  selector: 'app-uye-listele',
  templateUrl: './uye-listele.component.html',
  styleUrls: ['./uye-listele.component.css']
})
export class UyeListeleComponent implements OnInit {

  secDers: Ders;
  dersId: string;
  uyeId: string = "";
  kayitlar: Kayit[];
  dataSource: any;
  uyeler: Uye[];
  displayedColumns = ['uyeMail', 'uyeAdsoyad', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UyesecDialogComponent>;
  constructor(
    public route: ActivatedRoute,
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {

    this.route.params.subscribe((p: any) => {
      if (p) {
        this.dersId = p.dersId;
        this.DersGetir();
        this.KayitListele();
      }
    });
  }
  DersGetir() {
    this.apiServis.DersById(this.dersId).subscribe((d:Ders) => {
      this.secDers = d;
    });
  }
  KayitListele() {
    this.apiServis.DersUyeListe(this.dersId).subscribe(d => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KayitSil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "500px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.uyeBilgi.uyeAdsoyad + "Adlı Üye Dersten Çıkarılacaktır Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }

  Ekle() {
    this.dialogRef = this.matDialog.open(UyesecDialogComponent, {
      width: "800px;"
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitUyeId = d.uyeId;
        kayit.kayitDersId = this.dersId;
        this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });

      }
    });

  }
}
