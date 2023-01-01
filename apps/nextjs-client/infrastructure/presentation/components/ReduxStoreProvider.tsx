import { Provider } from 'react-redux';
import { appContainer } from '../../../application/interface';
import { TYPES } from '../../../application/interface/types';
import { IStateManagerAdapater } from '../../adapter/redux/redux.store.adapter';

const store = appContainer.get<IStateManagerAdapater>(
  TYPES.StateManagerAdapater
);
const reduxStore = store.getStore();

const ReduxStoreProvider = ({ children }: { children: any }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};

export default ReduxStoreProvider;
