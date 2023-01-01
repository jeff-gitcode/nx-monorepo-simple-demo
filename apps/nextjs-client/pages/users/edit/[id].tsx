import { GetServerSideProps } from 'next';
import { appContainer } from '../../../application/interface';
import { IUserUseCase } from '../../../application/interface/api/iusers.usecase';
import { TYPES } from '../../../application/interface/types';
import UserCard from '../../../infrastructure/presentation/components/UserCard/UserCard';

export default UserCard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as any;

  const userUseCase = appContainer.get<IUserUseCase>(TYPES.UserUseCase);
  const user = await userUseCase.getById(id);

  return {
    props: { user },
  };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const formUseCase = appContainer.get<IFormUseCase>(TYPES.FormUseCase);
//   const formItems = await formUseCase.getForm();

//   return {
//     props: { formItems },
//   };
// };
