import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MerchantComponent } from './pages/merchant/merchant.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { UsereditComponent } from './pages/useredit/useredit.component';
import { MerchanteditComponent } from './pages/merchantedit/merchantedit.component';
import {AuthGuard} from './auth.guard';
import {MerchantauthGuard} from './merchantauth.guard';
import {MerchanthomepageComponent} from './pages/merchanthomepage/merchanthomepage.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'index/register', component: RegisterComponent},
  {path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'merchant', component: MerchantComponent},
  {path: 'merchant/partner', component: PartnerComponent},
  {path: 'policy', component: PolicyComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'homepage/edit', component: UsereditComponent, canActivate: [AuthGuard]},
  {path: 'merchant/edit', component: MerchanteditComponent, canActivate: [MerchantauthGuard]},
  {path: 'merchant/homepage', component: MerchanthomepageComponent, canActivate: [MerchantauthGuard]},
  {path: '', redirectTo: '/index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
