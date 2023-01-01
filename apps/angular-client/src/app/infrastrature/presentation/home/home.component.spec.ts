import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IAuthService } from '../../../application/interface/spi/iauth.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let autServer: IAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: IAuthService,
          useValue: {
            logout: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    autServer = TestBed.inject(IAuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to logout', () => {
    component.logout();
    expect(autServer.logout).toHaveBeenCalled();
  });
});
