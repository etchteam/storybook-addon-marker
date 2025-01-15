/* eslint-disable react-hooks/rules-of-hooks */
import markerSDK from '@marker.io/browser';
import { useChannel, useGlobals } from '@storybook/preview-api';

import { EVENTS } from './constants';
import { hideDefaultMarkerButton } from './hideDefaultMarkerButton';

export const withMarker = (storyFn) => {
  const [globals] = useGlobals();
  const { project, mode, ...config } = globals.marker ?? {};

  const emit = useChannel({
    [EVENTS.CAPTURE]: () => {
      window.Marker?.capture(mode)?.then(() => {
        hideDefaultMarkerButton(); // This sometimes reappears after capturing
      });
    },
  });

  if (!project || window.Marker) {
    return storyFn();
  }

  markerSDK.loadWidget({ project, ...config }).then(() => {
    hideDefaultMarkerButton();
    emit(EVENTS.LOADED);
  });

  return storyFn();
};
