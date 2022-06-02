import { Ders } from "./Ders";
import { Uye } from "./Uye";

export class Kayit {
    kayitId: string;
    kayitDersId: string;
    kayitUyeId: string;
    uyeBilgi: Uye;
    dersBilgi: Ders;
  }