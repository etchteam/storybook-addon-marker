import { addons, makeDecorator, useParameter } from '@storybook/preview-api';
import { ADDON_ID } from './register';
import markerSDK from '@marker.io/browser';

const hideDefaultMarkerButton = () => {
  const markerBtns = [...document.querySelectorAll('.marker-app #feedback-button')];
  markerBtns.forEach(markerBtn => markerBtn.style.display = 'none');
}

export default makeDecorator({
  name: ADDON_ID,
  parameterName: ADDON_ID,
  wrapper: (getStory, context) => {
    const channel = addons.getChannel();
    const { destination, mode, ...config } = useParameter('marker', {});

    if (!destination) {
      return null;
    }

    markerSDK.loadWidget({
      destination: destination,
      ...config
    }).then((markerWidget) => {
      hideDefaultMarkerButton();

      channel.on('sendFeedback', () => {
        markerWidget.capture(mode);
      });
  
      channel.emit('showButton', !!markerWidget);
    });


    return getStory(context);
  }
})