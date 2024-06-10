import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { UserAccountTypeComponent } from './Components/user-account-type/user-account-type.component';
import { UserAccountTypeLayoutComponent } from './Components/user-account-type-layout/user-account-type-layout.component';
import { CharityRegisterComponent } from './Components/charity-register/charity-register.component';
import { CorporateRegisterComponent } from './Components/corporate-register/corporate-register.component';

const routes: Routes = [
  {path:'',component:UserAccountTypeLayoutComponent,children:[
    {path:'',redirectTo:'useraccounttype',pathMatch:'full'},
    {path:'useraccounttype',component:UserAccountTypeComponent}
  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'charityregister',component:CharityRegisterComponent},
    {path:'corporateregister',component:CorporateRegisterComponent}
   ]},
  {path:'',component:BlankLayoutComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'logout',component:LogoutComponent},
  ]},
 {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
