import { AuthGuard } from './services/AuthGuard';
import { DersComponent } from './components/Ders/Ders.component';
import { KategoriComponent } from './components/Kategori/Kategori.component';
import { UyeListeleComponent } from './components/uye-listele/uye-listele.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDersComponent } from './components/admin/admin-ders/admin-ders.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { DersListeleComponent } from './components/ders-listele/ders-listele.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler: ['Admin','Uye']
    }
  },
  {
    path: 'login',
     component: LoginComponent
  },
  {
    path: 'Kategori/:katId',
     component: KategoriComponent,
     canActivate: [AuthGuard],
     data:{
       yetkiler: ['Admin','Uye']
     }
  },
  {
    path: 'Ders/:dersId',
     component: DersComponent,
     canActivate: [AuthGuard],
     data:{
       yetkiler: ['Admin','Uye']
     }
  },
  {
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler: ['Admin']
    }
  },
  {
    path: 'admin/kategori', 
    component: AdminKategoriComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler: ['Admin']
    }
  },
  {
    path: 'admin/ders', 
    component: AdminDersComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler: ['Admin']
    }
  },
  {      
    path: 'admin/ders/:katId',
    component: AdminDersComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler: ['Admin']
    }
  },
  {
    path: 'admin/uye', 
    component: AdminUyeComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler: ['Admin']
    }
  },
  {
    path: 'derslistele/:uyeId',
     component: DersListeleComponent,
     canActivate: [AuthGuard],
     data:{
       yetkiler: ['Admin']
     }
  },
  {
    path: 'uyelistele/:dersId',
     component: UyeListeleComponent,
     canActivate: [AuthGuard],
     data:{
       yetkiler: ['Admin']
     }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
