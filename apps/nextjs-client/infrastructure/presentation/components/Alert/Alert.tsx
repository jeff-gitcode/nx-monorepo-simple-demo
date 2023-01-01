import { AlertMessage } from '../../../../domain/alert';
import { useAlert } from '../../../adapter/hooks/alert.hooks';
import { AlertType } from '../../../service/alert.service';

export type AlertProps = {
  // id?: string;
  // fade?: boolean;
};

const Alert = (props: AlertProps) => {
  // const { id, fade } = props;

  const { alerts, removeAlert } = useAlert();

  function cssClasses(alert: AlertMessage) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    };

    classes.push(alertTypeClass[alert.type]);

    return classes.join(' ');
  }

  if (!alerts.length) return null;

  return (
    <div className="container">
      <div className="m-3">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <a className="close" onClick={() => removeAlert(alert)}>
              &times;
            </a>
            <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alert;
