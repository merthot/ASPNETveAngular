import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ders } from 'src/app/models/Ders';

@Component({
  selector: 'app-ders-dialog',
  templateUrl: './ders-dialog.component.html',
  styleUrls: ['./ders-dialog.component.css']
})
export class DersDialogComponent implements OnInit {

  dialogBaslik: string;
  yeniKayit: Ders;
  islem: string;
  frm: FormGroup;
  kategoriler: Kategori[];

  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<DersDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Ders Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Ders Düzenle";
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
    });
  }

  FormOlustur(): FormGroup {
    return this.frmBuild.group({
      "dersKodu": [this.yeniKayit.dersKodu],
      "dersAdi": [this.yeniKayit.dersAdi],
      "dersKatId": [this.yeniKayit.dersKatId],
      "dersSaati": [this.yeniKayit.dersSaati],
    });
  }
}
