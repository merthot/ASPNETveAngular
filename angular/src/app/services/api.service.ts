import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ders } from '../models/Ders';
import { Kategori } from '../models/Kategori';
import { Kayit } from '../models/Kayit';
import { Sonuc } from '../models/Sonuc';
import { Uye } from '../models/Uye'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:49366/api/";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(uyeMail: string, parola: string) {
    var data = "username=" + uyeMail + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe() {
    return this.http.get(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number) {
    return this.http.get(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(katId: number) {
    return this.http.delete(this.apiUrl + "/kategorisil/" + katId);
  }

  DersListe() {
    return this.http.get<Ders[]>(this.apiUrl + "/dersliste");
  }
  DersListeSonEklenenler(s: number) {
    return this.http.get<Ders[]>(this.apiUrl + "/derslistesoneklenenler/" + s);
  }
  DersListeByKatId(katId: number) {
    return this.http.get(this.apiUrl + "/derslistebykatid/" + katId);
  }
  DersListeByUyeId(uyeId: string) {
    return this.http.get(this.apiUrl + "/derslistebyuyeid/" + uyeId);
  }
  DersById(dersId: string) {
    return this.http.get<Ders>(this.apiUrl + "/dersbyid/" + dersId);
  }
  DersEkle(ders: Ders) {
    return this.http.post<Sonuc>(this.apiUrl + "/dersekle", ders);
  }
  DersDuzenle(ders: Ders) {
    return this.http.put<Sonuc>(this.apiUrl + "/dersduzenle", ders);
  } 
  DersSil(dersId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "/derssil/" + dersId);
  }
  DersUyeListe(dersId: string) {
    return this.http.get<Kayit[]>(this.apiUrl + "/dersuyeliste/" + dersId);
  }

  UyeListe() {
    return this.http.get<Uye[]>(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: string) {
    return this.http.get<Uye>(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post<Sonuc>(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put<Sonuc>(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "/uyesil/" + uyeId);
  }
  UyeDersListe(uyeId: string) {
    return this.http.get<Kayit[]>(this.apiUrl + "/uyedersliste/" + uyeId);
  }

  KayitEkle(kayit: Kayit) {
    return this.http.post<Sonuc>(this.apiUrl + "/kayitekle", kayit);
  }
  KayitSil(kayitId: string) {
    return this.http.delete<Sonuc>(this.apiUrl + "/kayitsil/" + kayitId);
  }

}
