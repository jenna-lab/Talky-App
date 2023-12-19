import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: ""},
  {path: "", component:HomepageComponent},
  {path: "user", component:UserComponent},
  {path: "app", component:AppComponent},
  {path: "register", component:RegisterComponent},
  {path: "login", component:LoginComponent},
  {path: "forgotpwd", component:ForgotpwdComponent},
  {path: "profile", component:MyprofileComponent},



    {path: "**", component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
