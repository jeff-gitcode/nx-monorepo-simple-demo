import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { appRoutes, AppRoutingModule } from './app.routing.module';
import { ApplicationModule } from './application/di/application.module';
import { IAuthService } from './application/interface/spi/iauth.service';
import { IUserRepository } from './application/interface/spi/iusers.repository';
import { environment } from './environment/environment';
import { GraphQLModule } from './graphql.module';
import { AuthEffects } from './infrastrature/adapter/effect/auth.effect';
import { JsonFormEffects } from './infrastrature/adapter/effect/jsonform.effect';
import { UserEffects } from './infrastrature/adapter/effect/user.effect';
import {
  AuthFacadeService,
  IAuthFacadeService,
} from './infrastrature/adapter/facade/auth.facade.service';
import {
  IJsonFormService,
  JsonFormService,
} from './infrastrature/adapter/facade/jsonform.facade.service';
import {
  IUserService,
  UserService,
} from './infrastrature/adapter/facade/user.facade.service';
import {
  appReducers,
  metaReducers,
} from './infrastrature/adapter/reducer/app.reducer';
import {
  UserGraphQLRepository,
  UserRepository,
} from './infrastrature/db/user.repository';
import { HomeComponent } from './infrastrature/presentation/home/home.component';
import { LoginComponent } from './infrastrature/presentation/login/login.component';
import { NavbarComponent } from './infrastrature/presentation/navbar/navbar.component';
import { SignupComponent } from './infrastrature/presentation/signup/signup.component';
import { UsercardComponent } from './infrastrature/presentation/usercard/usercard.component';
import { UserlistComponent } from './infrastrature/presentation/userlist/userlist.component';
import { AuthService } from './infrastrature/service/auth.service';
import {
  AuthGraphQLService,
  IAuthGraphQLService,
  IJsonFormGraphQLService,
  IUserGraphQLService,
  JsonFormGraphQLService,
  UserGraphQLService,
} from './infrastrature/service/graphql.service';
import {
  HttpService,
  IHttpService,
} from './infrastrature/service/http.service';
import { TokenInterceptor } from './infrastrature/service/token.interceptor';
import { NxWelcomeComponent } from './nx-welcome.component';

const userRepo =
  environment.db === 'graphql' ? UserGraphQLRepository : UserRepository;

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    UserlistComponent,
    UsercardComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TableModule,
    ButtonModule,
    // InputTextModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    AppRoutingModule,
    ApplicationModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    GraphQLModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects, UserEffects, JsonFormEffects]),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  bootstrap: [AppComponent],
  exports: [
    UserlistComponent,
    UsercardComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
  ],
  providers: [
    { provide: IAuthGraphQLService, useClass: AuthGraphQLService },
    { provide: IJsonFormGraphQLService, useClass: JsonFormGraphQLService },
    { provide: IUserGraphQLService, useClass: UserGraphQLService },
    { provide: IHttpService, useClass: HttpService },
    { provide: IAuthService, useClass: AuthService },
    { provide: IJsonFormService, useClass: JsonFormService },
    { provide: IAuthFacadeService, useClass: AuthFacadeService },
    { provide: IUserService, useClass: UserService },
    { provide: IUserRepository, useClass: userRepo },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class AppModule {}
