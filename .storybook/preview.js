import withMarker from '../src/with-marker';

const preview = {
  parameters: {
    marker: {
      destination: '60f162459a86003bf9d741b3',
      mode: 'advanced'
    }
  },
  decorators: [
    withMarker,
  ],
};

export default preview;
