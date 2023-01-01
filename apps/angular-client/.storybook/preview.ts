// import '@angular/localize/init';
import { RouterContext } from 'next/dist/shared/lib/router-context';
// ...

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
    locale: 'en', // optional
  },
};
