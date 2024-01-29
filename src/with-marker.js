import { addons, makeDecorator, useParameter, useState } from '@storybook/preview-api';
import { ADDON_ID } from './register';
import markerSDK from '@marker.io/browser';

const hideDefaultMarkerButton = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .marker-app #feedback-button {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
}

export default makeDecorator({
  name: ADDON_ID,
  parameterName: ADDON_ID,
  wrapper: (getStory, context) => {
    const [markerWidget, setMarkerWidget] = useState(null);    
    const channel = addons.getChannel();
    const { destination, mode, ...config } = useParameter('marker', {});

    if (!destination) {
      return null;
    }

    channel.on('sendFeedback', async () => {
      let markerInstance = markerWidget;

      if (!markerWidget) {
        markerInstance = await markerSDK.loadWidget({
          destination: destination,
          ...config
        });
        setMarkerWidget(markerInstance);
        hideDefaultMarkerButton();
      }

      markerInstance.capture(mode);
    });

    return getStory(context);
  }
})