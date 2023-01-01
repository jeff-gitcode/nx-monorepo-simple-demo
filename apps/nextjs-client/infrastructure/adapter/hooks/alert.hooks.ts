import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { useDispatch, useSelector } from 'react-redux';
import 'reflect-metadata';

import { AlertMessage } from '../../../domain/alert';
import { AlertType } from '../../service/alert.service';
import {
  clearMessageAction,
  sendMessageAction,
  subsribeAction,
} from '../redux/alert.reducer';

export const useAlert = (): {
  alerts: AlertMessage[];
  removeAlert: (alert: any) => void;
  sendAlert: (alert: any) => void;
} => {
  const router = useRouter();

  const [alerts, setAlerts] = useState([] as AlertMessage[]);

  const subscriber: Subscription = useSelector(
    (state: any) =>
      state.alert?.observer ?? {
        unsubscribe: () => {},
      }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      subsribeAction((alert: AlertMessage) => {
        if (alert.message) {
          console.log(
            '🚀 ~ file: alert.hooks.ts:37 ~ subsribeAction ~ alert.message',
            alert.message
          );
          // setAlerts((alerts) => [...alerts, alert]);
          setAlerts((alerts) => [alert]);
          setTimeout(() => removeAlert(), 5000);
        }
      })
    );

    if (alerts?.length > 0) {
      console.log(
        '🚀 ~ file: alert.hooks.ts:45 ~ useEffect ~ alerts?.length',
        alerts?.length
      );
      const onRouteChange = () => dispatch(clearMessageAction());
      router.events.on('routeChangeStart', onRouteChange);

      // clean up function that runs when the component unmounts
      return () => {
        // unsubscribe to avoid memory leaks
        subscriber.unsubscribe();
        router.events.off('routeChangeStart', onRouteChange);
      };
    }
  }, [dispatch]);

  const removeAlert = () => {
    console.log(
      '🚀 ~ file: alert.hooks.ts:66 ~ removeAlert ~ removeAlert',
      removeAlert
    );
    if (alert.length > 0) {
      setAlerts([] as AlertMessage[]);
      dispatch(clearMessageAction());
    }
  };

  const sendAlert = (alert: any) => {
    dispatch(
      sendMessageAction({
        message: alert,
        type: AlertType.Success,
      })
    );
  };
  return { alerts, removeAlert, sendAlert };
};

// export default useAlert;
