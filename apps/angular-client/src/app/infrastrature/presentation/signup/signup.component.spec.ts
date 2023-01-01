// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SignupComponent } from './signup.component';

// describe('SignupComponent', () => {
//   let component: SignupComponent;
//   let fixture: ComponentFixture<SignupComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [SignupComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(SignupComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ApplicationModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IAuthFacadeService } from '../../adapter/facade/auth.facade.service';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let jsonFormFacade: IJsonFormService;
  let authFacade: IAuthFacadeService;
  let router: Router;
  let navigateSpy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ApplicationModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: IJsonFormService,
          useValue: {
            getJsonForm: jest.fn(),
          },
        },
        {
          provide: IAuthFacadeService,
          useValue: {
            signUp: jest.fn(),
          },
        },
      ],
      declarations: [SignupComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(SignupComponent);
    router = TestBed.inject(Router);
    jsonFormFacade = TestBed.inject(IJsonFormService);

    component = fixture.componentInstance;
    component.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getJsonForm on init', () => {
    component.ngOnInit();
    expect(jsonFormFacade.getJsonForm).toHaveBeenCalled();
  });

  xit('should call signUp on submit if form is valid', async () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
    });

    component.onSubmit(component.model);
    expect(authFacade.signUp).toHaveBeenCalledWith(component.model);
  });

  xit('should not call signUp on submit if form is invalid', () => {
    component.registerForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    component.onSubmit(component.model);
    expect(authFacade.signUp).not.toHaveBeenCalled();
  });

  it('should navigate to login page on login', () => {
    navigateSpy = jest.spyOn(router, 'navigate');
    component.login();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
