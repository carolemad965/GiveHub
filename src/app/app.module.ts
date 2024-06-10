import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthNavbarComponent } from './Components/auth-navbar/auth-navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { BlankNavbarComponent } from './Components/blank-navbar/blank-navbar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/home/home.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { UserAccountTypeComponent } from './Components/user-account-type/user-account-type.component';
import { UserAccountTypeLayoutComponent } from './Components/user-account-type-layout/user-account-type-layout.component';
import { CharityRegisterComponent } from './Components/charity-register/charity-register.component';
import { CorporateRegisterComponent } from './Components/corporate-register/corporate-register.component';
import { NavCorporateRegisterComponent } from './Components/nav-corporate-register/nav-corporate-register.component';
import { NavCharityRegisterComponent } from './Components/nav-charity-register/nav-charity-register.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthNavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    BlankNavbarComponent,
    HomeComponent,
    LogoutComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    UserAccountTypeComponent,
    UserAccountTypeLayoutComponent,
    CharityRegisterComponent,
    CorporateRegisterComponent,
    NavCorporateRegisterComponent,
    NavCharityRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
