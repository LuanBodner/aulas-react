import { JSXElementConstructor, ReactElement } from 'react';

export type View1Props = {
  displayText: string;
  children?: Array<ReactElement<any, string | JSXElementConstructor<any>>>;
};
