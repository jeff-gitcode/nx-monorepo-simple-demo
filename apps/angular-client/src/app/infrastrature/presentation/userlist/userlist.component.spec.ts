import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ApplicationModule } from '../../../application/di/application.module';
import { UserDTO } from '../../../domain/user';
import {
  IJsonFormService,
  JsonFormService,
} from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';

import { UserlistComponent } from './userlist.component';

describe('UserlistComponent', () => {
  let component: UserlistComponent;
  let fixture: ComponentFixture<UserlistComponent>;
  let router: Router;
  let navigateSpy;
  let userFacade: IUserService;

  const users: UserDTO[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '1234',
    },
  ];

  const initialState = { users };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationModule, RouterTestingModule.withRoutes([])],
      declarations: [UserlistComponent],
      providers: [
        {
          provide: IUserService,
          useValue: {
            deleteUser: jest.fn(),
            getAll: jest.fn(),
          },
        },
        { provide: IJsonFormService, useClass: JsonFormService },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserlistComponent);
    router = TestBed.inject(Router);
    userFacade = TestBed.inject(IUserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should createUser', () => {
    navigateSpy = jest.spyOn(router, 'navigate');

    component.createUser('');
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should UpdateUser', () => {
    navigateSpy = jest.spyOn(router, 'navigate');

    component.updateUser('1');
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should DeleteUser', () => {
    component.deleteUser('1');
    expect(userFacade.deleteUser).toHaveBeenCalled();
    expect(userFacade.getAll).toHaveBeenCalled();
  });
});
