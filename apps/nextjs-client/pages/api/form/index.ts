import { appContainer } from '../../../application/interface';
import { IFormRepository } from '../../../application/interface/spi/iform.repository';
import { TYPES } from '../../../application/interface/types';

export default handler;

async function handler(req: any, res: any) {
  switch (req.method) {
    case 'GET':
      return await getForm();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getForm() {
    const formRepository = appContainer.get<IFormRepository>(
      TYPES.FormRepository
    );
    const [form] = await formRepository.getForm();
    return res.status(200).json(form);
  }
}
