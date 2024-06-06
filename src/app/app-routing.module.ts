import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';

const routes: Routes = [
  {path:'',component:AuthLayoutComponent,children:[
    {path:'',redirectTo:'register',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
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
