import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserDTO } from '../../../domain/user';
import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from '../redux/user.reducer';
import { getUserListAction } from '../redux/userList.reducer';

const useUser = (): {
  users: UserDTO[];
  useCreateUser: (req: UserDTO) => void;
  useUpdateUser: (req: UserDTO) => void;
  useDeleteUser: (req: string) => void;
  useGetUserList: () => void;
} => {
  const users: UserDTO[] = useSelector((state: any) => state.userList.items);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(users);
    dispatch(getUserListAction());
  }, [dispatch]);

  const useGetUserList = useCallback(() => {
    dispatch(getUserListAction());
  }, [dispatch]);

  const useCreateUser = useCallback(
    (user: UserDTO) => {
      dispatch(createUserAction(user));
    },
    [dispatch]
  );

  const useUpdateUser = useCallback(
    (user: UserDTO) => {
      dispatch(updateUserAction(user));
    },
    [dispatch]
  );

  const useDeleteUser = useCallback(
    (id: string) => {
      dispatch(deleteUserAction(id));
    },
    [dispatch]
  );

  return {
    users,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
    useGetUserList,
  };
};

export default useUser;
