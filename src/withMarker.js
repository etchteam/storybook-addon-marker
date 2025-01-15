/* eslint-disable react-hooks/rules-of-hooks */
import markerSDK from '@marker.io/browser';
import { useChannel, useParameter } from '@storybook/preview-api';

import { EVENTS } from './constants';
import { hideDefaultMarkerButton } from './hideDefaultMarkerButton';

export const withMarker = (storyFn) => {
  const { destination, project, mode, ...config } = useParameter('marker', {});
  const emit = useChannel({
    [EVENTS.CAPTURE]: () => {
      window.Marker?.capture(mode)?.then(() => {
        hideDefaultMarkerButton(); // This sometimes reappears after capturing
      });
    },
  });

  if ((!destination && !project) || window.Marker) {
    return storyFn();
  }

  markerSDK
    .loadWidget({
      project: project ?? destination,
      ...config,
    })
    .then(() => {
      hideDefaultMarkerButton();
      emit(EVENTS.LOADED);
    });

  return storyFn();
};
