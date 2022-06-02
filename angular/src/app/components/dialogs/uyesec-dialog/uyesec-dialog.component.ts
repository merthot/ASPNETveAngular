import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-uyesec-dialog',
  templateUrl: './uyesec-dialog.component.html',
  styleUrls: ['./uyesec-dialog.component.css']
})
export class UyesecDialogComponent implements OnInit {
  
  uyeler: Uye[];
  displayedColumns = ['uyeMail', 'uyeAdsoyad', 'uyeDersSayisi', 'islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: MyAlertService,
    public dialogRef:MatDialogRef<UyeDialogComponent>
     
  ) { }

  ngOnInit() {
    this.KayitGetir();
  }
  KayitGetir() {
    this.apiServis.UyeListe().subscribe((d:Uye[]) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filtrele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Ekle(uye: Uye) {
    this.dialogRef.close(uye);
  }

  UyeSec(uye: Uye){
    this.dialogRef.close(uye);

  }
}