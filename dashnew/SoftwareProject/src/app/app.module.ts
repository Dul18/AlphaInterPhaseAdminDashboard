import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase imports
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

import { AuthService } from './service/auth.service';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ConsultantFormComponent } from './consultant/consultant-form/consultant-form.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { LoginComponent } from './consultant/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterNewComponent } from './dashboard/register-new/register-new.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ConsultantFormComponent,
    RegisterNewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireStorageModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
