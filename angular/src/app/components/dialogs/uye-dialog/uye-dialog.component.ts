import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uye;
  islem: string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuilder: FormBuilder,
    public apiServis: ApiService
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;  
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yeni Üye Ekle";
      this.yeniKayit = new Uye();
    }
    else {
      this.dialogBaslik = "Üye Düzenle";
      this.yeniKayit = data.kayit;
    }
    this.frm = this.FormOlustur();
  }
  ngOnInit() {
  }

  FormOlustur(): FormGroup {
    return this.frmBuilder.group({
      "uyeMail": [this.yeniKayit.uyeMail],
      "uyeAdsoyad": [this.yeniKayit.uyeAdsoyad],
      "uyeSifre" : [this.yeniKayit.uyeSifre],
      "uyeAdmin" : [this.yeniKayit.uyeAdmin]

    });
  }
}

