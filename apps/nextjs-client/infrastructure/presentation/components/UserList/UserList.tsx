import { FC } from 'react';

import { UserDTO } from '../../../../domain/user';
import { useAlert } from '../../../adapter/hooks/alert.hooks';
import useFormFields from '../../../adapter/hooks/form.hooks';
import useUser from '../../../adapter/hooks/user.hooks';
import PagedList from '../paged-list/paged-list';

export type UserListProps = {
  users: UserDTO[];
  useAlert?: any;
};

// const UserList: FC<UserListProps> = ({ users }: UserListProps) => {
const UserList: FC<UserListProps> = () => {
  const {
    users,
    useDeleteUser: deleteUser,
    useGetUserList: getUserList,
  } = useUser();
  const { formList } = useFormFields();
  console.log('🚀 ~ file: UserList.tsx:22 ~ formList', formList);
  const { sendAlert: sendAlertMessage } = useAlert();
  async function onDeleteUser(id: string) {
    deleteUser(id);
    sendAlertMessage('User deleted');
  }

  if (!users || !formList) {
    return null;
  }

  return (
    <PagedList data={users} columns={formList} deleteUser={onDeleteUser} />
    // <div>
    //   <h1 className="display-4">Welcome to Nextjs-Client</h1>
    //   <Link className="btn btn-sm btn-success mb-2" href="/users/add">
    //     Add User
    //   </Link>
    //   <table className="table table-striped">
    //     <thead>
    //       <tr>
    //         {formList &&
    //           formList.map((item: any) => {
    //             return <th key={item.title}>{item.title}</th>;
    //           })}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users &&
    //         users.length > 0 &&
    //         users.map((user: UserDTO) => (
    //           <UserItem
    //             key={user.id}
    //             user={user}
    //             list={formList}
    //             deleteUser={onDeleteUser}
    //           />
    //         ))}
    //       {!users && (
    //         <tr>
    //           <td className="text-center">
    //             <div className="spinner-border spinner-border-lg align-center"></div>
    //           </td>
    //         </tr>
    //       )}
    //       {users && !users.length && (
    //         <tr>
    //           <td className="text-center">
    //             <div className="p-2">No Users To Display</div>
    //           </td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default UserList;
