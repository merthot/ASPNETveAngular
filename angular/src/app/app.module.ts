import { DersComponent } from './components/Ders/Ders.component';
import { KategoriComponent } from './components/Kategori/Kategori.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from './services/myAlert.service';
import { MatSortModule } from '@angular/material/sort';
import { SafeHTMLPipe } from './components/pipes/safeHtml-pipe.pipe';
import { UyesecDialogComponent } from './components/dialogs/uyesec-dialog/uyesec-dialog.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminDersComponent } from './components/admin/admin-ders/admin-ders.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UyeListeleComponent } from './components/uye-listele/uye-listele.component';
import { DersListeleComponent } from './components/ders-listele/ders-listele.component';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform, Pipe } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    DersListeleComponent,
    UyeListeleComponent,
    KategoriComponent,
    DersComponent,


    //admin
    AdminComponent,
    AdminKategoriComponent,
    AdminDersComponent,
    AdminUyeComponent,


    //dialog
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    DersDialogComponent,
    UyeDialogComponent,
    UyesecDialogComponent,
    SafeHTMLPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSortModule,
    
    
    
    
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    DersDialogComponent,
    UyeDialogComponent,
    UyesecDialogComponent
  ],
  providers: [MyAlertService, ApiService, SafeHTMLPipe,AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
