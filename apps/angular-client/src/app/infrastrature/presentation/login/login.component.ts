import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { LoginUser, LoginUserDTO } from '../../../domain/user';
import { IAuthFacadeService } from '../../adapter/facade/auth.facade.service';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';

@Component({
  selector: 'nx-monorepo-demo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});
  error$: Observable<string> = this.authenticationService.error$;
  error!: string;
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
      },
    },
  ];
  @Input() model: LoginUserDTO = new LoginUserDTO();

  constructor(
    private toastr: ToastrService,
    private jsonFormFacade: IJsonFormService,
    private authenticationService: IAuthFacadeService,
    private router: Router
  ) {
    this.error$.subscribe((item: string) => {
      this.error = item;
      console.log(
        '🚀 ~ file: login.component.ts:51 ~ LoginComponent ~ this.error$.subscribe ~ this.error',
        this.error
      );
      if (this.error) {
        this.showToast(this.error);
        this.error = '';
      }
    });
  }

  ngOnInit(): void {
    // this.form = new FormGroup({});
    this.jsonFormFacade.getJsonForm();
  }

  public onSubmit(model: LoginUserDTO) {
    console.log(this.model);
    if (this.form.valid) {
      // submit the model
      const loginUser: LoginUser = {
        username: this.model.email,
        password: this.model.password,
      };
      this.authenticationService.login(loginUser);
    }
  }

  showToast(message: string) {
    this.toastr.error(message, 'Error');
  }

  ngOnChanges() {
    console.log(
      '🚀 ~ file: login.component.ts:84 ~ LoginComponent ~ ngOnChanges ~ this.error',
      this.error
    );
    if (this.error) {
      this.showToast(this.error);
    }
  }

  public registerUser() {
    this.router.navigate(['/register']);
  }
}
