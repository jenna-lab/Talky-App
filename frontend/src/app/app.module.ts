import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
<<<<<<< HEAD
=======
import { SearchComponent } from './search/search.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';

>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomepageComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    MyprofileComponent,
<<<<<<< HEAD
    ForgotpwdComponent
=======
    ForgotpwdComponent,
    SearchComponent
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
      NgxDropzoneModule,
      HttpClientModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
