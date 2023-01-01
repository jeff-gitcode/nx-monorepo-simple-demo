import { GetStaticProps } from 'next';
import { appContainer } from '../../application/interface';
import { IUserUseCase } from '../../application/interface/api/iusers.usecase';
import { TYPES } from '../../application/interface/types';
import UserList from '../../infrastructure/presentation/components/UserList/UserList';

export default UserList;

export const getStaticProps: GetStaticProps = async () => {
  // no api call allowed in SSG
  const userUseCase = appContainer.get<IUserUseCase>(TYPES.UserUseCase);
  const users = await userUseCase.getAll();

  return {
    props: { users },
  };
};
