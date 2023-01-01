import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './infrastrature/presentation/home/home.component';
import { LoginComponent } from './infrastrature/presentation/login/login.component';
import { SignupComponent } from './infrastrature/presentation/signup/signup.component';
import { UsercardComponent } from './infrastrature/presentation/usercard/usercard.component';
import { UserlistComponent } from './infrastrature/presentation/userlist/userlist.component';
import { AuthGuard } from './infrastrature/service/auth.guard';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserlistComponent, canActivate: [AuthGuard] },
  { path: 'user/:id?', component: UsercardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
