import { CommonModule } from '@angular/common';
import { ApplicationModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ToastrModule } from 'ngx-toastr';
import { IAuthService } from '../../../application/interface/spi/iauth.service';
import { appReducers, metaReducers } from '../../adapter/reducer/app.reducer';
import { HomeComponent } from './home.component';

export default {
  title: 'HomeComponent',
  component: HomeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserModule,
        CommonModule,
        ApplicationModule,
        RouterTestingModule,
        // InputTextModule,
        ToastrModule.forRoot(), // ToastrModule added
        ApplicationModule,
        FormsModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
        StoreModule.forRoot(appReducers, { metaReducers }),
      ],
      providers: [
        {
          provide: IAuthService,
          useValue: {
            logout: () => {
              //
            },
          },
        },
      ],
    }),
  ],
} as Meta<HomeComponent>;

const Template: Story<HomeComponent> = (args: HomeComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
