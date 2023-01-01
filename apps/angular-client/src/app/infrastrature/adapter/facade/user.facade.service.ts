import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserDTO } from '../../../domain/user';
import { IAppState } from '../reducer/app.reducer';
import {
  CreateUser,
  DeleteUser,
  GetUser,
  GetUserList,
  UpdateUser,
} from '../reducer/user.reducer';
import { selectSelectedUser, selectUserList } from '../selector/user.selector';

export abstract class IUserService {
  userList$: Observable<UserDTO[]> = of([] as UserDTO[]);
  selectedUser$: Observable<UserDTO> = of(new UserDTO());

  abstract updateUser(user: UserDTO): void;
  abstract getAll(): void;
  abstract getUser(id: string): void;
  abstract deleteUser(id: string): void;
}

@Injectable()
export class UserService implements IUserService {
  userList$ = this.store.pipe(select(selectUserList));
  userList: UserDTO[] = [];
  selectedUser$ = this.store.pipe(select(selectSelectedUser));

  constructor(private store: Store<IAppState>) {
    this.userList$.subscribe((users: UserDTO[]) => {
      this.userList = users;
    });
  }

  getAll(): void {
    this.store.dispatch(new GetUserList());
  }

  getUser(id: string): void {
    this.store.dispatch(new GetUser({ id }));
  }

  updateUser(user: UserDTO) {
    //Update user
    if (user.id) {
      this.store.dispatch(new UpdateUser({ id: user.id, user }));
    }
    // Create user
    if (
      this.userList?.length &&
      !this.userList.filter((item) => item.email === user.email).length
    ) {
      this.store.dispatch(new CreateUser(user));
    } else {
      console.log(`failed , email duplicated: ${user.email}`);
    }
  }

  deleteUser(id: string) {
    this.store.dispatch(new DeleteUser({ id }));
  }
}
