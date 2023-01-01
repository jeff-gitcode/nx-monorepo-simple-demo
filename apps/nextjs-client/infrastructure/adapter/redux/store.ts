import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  ReducersMapObject,
  Store,
} from '@reduxjs/toolkit';
import { injectable } from 'inversify';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { Unsubscribe } from 'redux-saga';

type StoreData<State> = {
  rootReducer: ReducersMapObject<State>;
  rootSaga?: any;
};

export abstract class IStateManager<State, Store> {
  abstract getStore: () => Store;
  abstract getState: () => State;
  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract dispatch: (action: Object) => void;
  abstract subscribe(listener: () => void): Unsubscribe;
}

@injectable()
class ReduxStore<T> implements IStateManager<T, Store<T>> {
  private store: Store<T>;

  constructor(storeData: StoreData<T>) {
    const { rootReducer, rootSaga } = storeData;
    const middlewares: Array<Middleware> = [];
    let sagaMiddleware;
    let reduxLogger;

    if (rootSaga) {
      sagaMiddleware = createSagaMiddleware();
      reduxLogger = createLogger();

      middlewares.push(sagaMiddleware);
      middlewares.push(reduxLogger);
    }

    // middlewares.push(logger);

    const store = createStore(
      combineReducers(rootReducer),
      applyMiddleware(...middlewares)
    );

    if (sagaMiddleware) {
      sagaMiddleware?.run(rootSaga);
    }

    this.store = store;
  }

  getStore() {
    return this.store;
  }

  getState() {
    return this.store.getState();
  }

  dispatch(action: any) {
    this.store.dispatch(action);
  }

  subscribe(cb: () => void) {
    return this.store.subscribe(cb);
  }
}

export default ReduxStore;
