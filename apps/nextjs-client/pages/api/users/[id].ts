import { appContainer } from '../../../application/interface';
import { IUserRepository } from '../../../application/interface/spi/iusers.repository';
import { TYPES } from '../../../application/interface/types';

export default handler;

async function handler(req: any, res: any) {
  switch (req.method) {
    case 'GET':
      return await getUserById();
    case 'PUT':
      return await updateUser();
    case 'DELETE':
      return await deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUserById() {
    const usersRepo = appContainer.get<IUserRepository>(TYPES.UserRepository);
    const user = await usersRepo.getById(req.query.id);
    return res.status(200).json(user);
  }

  async function updateUser() {
    try {
      const usersRepo = appContainer.get<IUserRepository>(TYPES.UserRepository);
      await usersRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function deleteUser() {
    const usersRepo = appContainer.get<IUserRepository>(TYPES.UserRepository);
    await usersRepo.delete(req.query.id);
    return res.status(200).json({});
  }
}
