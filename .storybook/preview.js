import { addDecorator } from '@storybook/react';
import withMarker from '../src';

addDecorator(withMarker);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  marker: {
    destination: '60f162459a86003bf9d741b3',
    mode: 'advanced'
  }
}