import markerSDK from '@marker.io/browser';
import { Button } from '@storybook/components';
import { useParameter } from '@storybook/manager-api';
import React, { useCallback, useEffect, useState } from 'react';

import { TOOL_ID } from './constants';

const hideDefaultMarkerButton = () => {
  const markerBtns = [
    ...document.querySelectorAll('.marker-app #feedback-button'),
  ];
  markerBtns.forEach((markerBtn) => (markerBtn.style.display = 'none'));
};

export default function FeedbackButton() {
  const [markerLoaded, setMarkerLoaded] = useState();
  const { destination, mode, ...config } = useParameter('marker', {});

  useEffect(() => {
    if (!destination || markerLoaded || window.Marker) {
      return;
    }

    markerSDK
      .loadWidget({
        destination: destination,
        ...config,
      })
      .then(() => {
        hideDefaultMarkerButton();
        setMarkerLoaded(true);
      });
  }, [destination]);

  const handleSendFeedback = useCallback(() => {
    window.Marker?.capture(mode);
  }, [mode]);

  return markerLoaded ? (
    <Button
      style={{
        height: '28px',
        marginBlockStart: '6px',
        marginInlineStart: '4px',
      }}
      key={TOOL_ID}
      onClick={handleSendFeedback}
      outline
      small
    >
      Feedback
    </Button>
  ) : null;
}
