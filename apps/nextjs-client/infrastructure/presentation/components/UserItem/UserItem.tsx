import Link from 'next/link';
import { FC } from 'react';
import { UserDTO } from '../../../../domain/user';

export type UserItemProps = {
  user: UserDTO;
  list: any[];
  deleteUser: (id: string) => void;
};

const UserItem: FC<UserItemProps> = (props: UserItemProps) => {
  const { user, list, deleteUser } = props;

  return (
    <tr key={user.id}>
      {list &&
        list.map((item) => {
          return (
            <td key={item.name as keyof UserDTO}>
              {user[item.name as keyof UserDTO]}
            </td>
          );
        })}
      {/* <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.password}</td> */}
      <td style={{ whiteSpace: 'nowrap' }}>
        <Link
          href={`/users/edit/${user.id}`}
          className="btn btn-sm btn-primary mr-1"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteUser(user.id)}
          className="btn btn-sm btn-danger btn-delete-user"
          disabled={user.isDeleting}
        >
          {user.isDeleting ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <span>Delete</span>
          )}
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
