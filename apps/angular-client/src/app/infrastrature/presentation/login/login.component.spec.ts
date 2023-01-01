import { ApplicationModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { IAuthFacadeService } from '../../adapter/facade/auth.facade.service';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let toastr: ToastrService;
  let authFacade: IAuthFacadeService;
  let navigateSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationModule, RouterTestingModule.withRoutes([])],
      declarations: [LoginComponent],
      providers: [
        {
          provide: ToastrService,
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: IJsonFormService,
          useValue: {
            getJsonForm: jest.fn(),
          },
        },
        {
          provide: IAuthFacadeService,
          useValue: {
            login: jest.fn(),
            error$: of('error message'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
    authFacade = TestBed.inject(IAuthFacadeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on form submit', () => {
    component.form = new FormGroup({});
    component.form.markAsTouched();
    component.model = { email: 'test@example.com', password: 'password' };
    component.onSubmit(component.model);

    expect(authFacade.login).toHaveBeenCalledWith({
      username: 'test@example.com',
      password: 'password',
    });
  });

  it('should show toast on error$ emission', () => {
    authFacade.error$ = of('error message');
    component.ngOnInit();
    expect(toastr.error).toHaveBeenCalledWith('error message', 'Error');
  });

  it('should navigate to register page on registerUser call', () => {
    navigateSpy = jest.spyOn(router, 'navigate');
    component.registerUser();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
