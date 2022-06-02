import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  private alertDialogref: MatDialogRef<AlertDialogComponent>;
  constructor(
    private matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "Tamam";
    } else {
      baslik = "Hata";
    }
    this.alertDialogref = this.matDialog.open(AlertDialogComponent, {
      width: "300px"
    });

    this.alertDialogref.componentInstance.dialogBaslik = baslik;
    this.alertDialogref.componentInstance.dialogMesaj = s.mesaj;
    this.alertDialogref.componentInstance.dialogIslem = s.islem;
    this.alertDialogref.afterClosed().subscribe(d => {
      this.alertDialogref = null;
    });

  }
}
