import { appContainer } from '../../../application/interface';
import { IUserRepository } from '../../../application/interface/spi/iusers.repository';
import { TYPES } from '../../../application/interface/types';

export default handler;

async function handler(req: any, res: any) {
  switch (req.method) {
    case 'GET':
      return await getUsers();
    case 'POST':
      return await createUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUsers() {
    const usersRepo = appContainer.get<IUserRepository>(TYPES.UserRepository);
    const users = await usersRepo.getAll();
    return res.status(200).json(users);
  }

  async function createUser() {
    try {
      const usersRepo = appContainer.get<IUserRepository>(TYPES.UserRepository);
      await usersRepo.create(req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}
