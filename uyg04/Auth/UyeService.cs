using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using uyg04.Models;
using uyg04.ViewModel;

namespace uyg04.Auth
{
    public class UyeService
    {
        DB04Entities db = new DB04Entities();

        public UyeModel UyeOturumAc(string mail, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.uyeMail == mail && s.uyeSifre == parola).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdsoyad = x.uyeAdsoyad,
                uyeMail = x.uyeMail,
                uyeSifre = x.uyeSifre,
                uyeAdmin = x.uyeAdmin
            }).SingleOrDefault();
            return uye;
        }
    }
}