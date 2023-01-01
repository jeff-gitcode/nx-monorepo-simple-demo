import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UserDTO } from '../../../domain/user';
import { IAuthFacadeService } from '../../adapter/facade/auth.facade.service';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';

@Component({
  selector: 'nx-monorepo-demo-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  registerForm!: FormGroup;
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First Name',
        placeholder: 'Enter First Name',
        required: true,
      },
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        required: true,
      },
    },
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
  @Input() model: UserDTO = new UserDTO();

  constructor(
    private jsonFormFacade: IJsonFormService,
    private authenticationService: IAuthFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({});
    this.jsonFormFacade.getJsonForm();
  }

  public onSubmit(model: UserDTO) {
    console.log(this.model);
    if (this.registerForm.valid) {
      // submit the model
      this.authenticationService.signUp(this.model);
    }
  }

  public login() {
    this.router.navigate(['/login']);
  }
}
