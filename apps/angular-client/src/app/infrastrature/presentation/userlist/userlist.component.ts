import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserDTO } from '../../../domain/user';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';
@Component({
  selector: 'nx-monorepo-demo-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: [
    // 'bootstrap/dist/css/bootstrap.min.css',
    './userlist.component.css',
  ],
})
export class UserlistComponent {
  userList$: Observable<UserDTO[]> = this.userFacade.userList$;
  formList$ = this.jsonFormFacade.jsonForm$.pipe(map((obj) => obj.formList));
  data: any[] = [];
  first = 0;
  rows = 10;

  constructor(
    private userFacade: IUserService,
    private jsonFormFacade: IJsonFormService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.jsonFormFacade.getJsonForm();
    this.userFacade.getAll();
    this.userFacade.userList$.subscribe((data: any) => {
      console.log(
        '🚀 ~ file: userlist.component.ts:31 ~ UserlistComponent ~ this.userFacade.userList$.subscribe ~ data',
        data
      );
      this.data = Object.assign([], data);
    });
    // this.data = await lastValueFrom(this.userFacade.userList$);
  }

  // private getAll() {
  //   this.userFacade.getAll().subscribe((data) => {
  //     this.userList = data;
  //   });
  // }

  createUser(id: string) {
    this.router.navigate(['user', id]);
  }

  updateUser(id: string) {
    this.router.navigate(['user', id]);
  }

  deleteUser(id: string) {
    this.userFacade.deleteUser(id);
    this.userFacade.getAll();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.data ? this.first === this.data.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.data ? this.first === 0 : true;
  }

  // userList: UserDTO[] = [];
  // first = 0;
  // rows = 10;

  // constructor(private userUseCase: IUserUseCase) {}

  // ngOnInit(): void {
  //   // Get Users from UserService
  //   this.userList = [];
  //   this.userUseCase.getAll().subscribe((value: UserDTO[]) => {
  //     this.userList.concat(value);
  //   });
  // }
  // //****************PrimeNG DataTable Pagination method Start*********************** */
  // //***************Reference: https://primefaces.org/primeng/showcase/#/table/page********** */
  // next() {
  //   this.first = this.first + this.rows;
  // }
  // prev() {
  //   this.first = this.first - this.rows;
  // }
  // reset() {
  //   this.first = 0;
  // }
  // isLastPage(): boolean {
  //   return this.userList
  //     ? this.first === this.userList.length - this.rows
  //     : true;
  // }
  // isFirstPage(): boolean {
  //   return this.userList ? this.first === 0 : true;
  // }
  // //****************PrimeNG DataTable Pagination Method End*********************** */
  // // ********************User To Remove User from User List*************************/
  // remove(id: number) {
  //   this.userUseCase.delete(id);
  //   this.userUseCase.getAll().subscribe((value: UserDTO[]) => {
  //     this.userList.concat(value);
  //   });
  // }

  // userList: UserDTO[] = [];

  // constructor(private userUseCase: IUserUseCase) {}

  // updateUsers() {
  //   this.userList = [];
  //   this.userUseCase.getAll().subscribe((value: UserDTO[]) => {
  //     this.userList.concat(value);
  //   });
  // }

  // onSelect(event: { target: any }) {
  //   console.log(event.target);
  // }
}
