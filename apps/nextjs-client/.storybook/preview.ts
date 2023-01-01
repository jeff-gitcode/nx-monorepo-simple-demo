import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12
// import { RouterContext } from "next/dist/shared/lib/router-context"; // next 11.1
// import { RouterContext } from "next/dist/next-server/lib/router-context"; // next < 11.1
// import * as NextImage from 'next/image';
import { withConsole } from '@storybook/addon-console';
import { addDecorator } from '@storybook/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const OriginalNextImage = NextImage.default;

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props: any) => <OriginalNextImage {...props} unoptimized />,
// });

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
