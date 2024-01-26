import markerSDK from '@marker.io/browser';
import { Button } from '@storybook/components';
import { useGlobals, useParameter } from '@storybook/manager-api';
import React, { useCallback, useEffect } from 'react';

import { WIDGET_KEY, TOOL_ID } from './constants';

const hideDefaultMarkerButton = () => {
  const markerBtns = [
    ...document.querySelectorAll('.marker-app #feedback-button'),
  ];
  markerBtns.forEach((markerBtn) => (markerBtn.style.display = 'none'));
};

export default function FeedbackButton() {
  const [globals, updateGlobals] = useGlobals();
  const { destination, mode, ...config } = useParameter('marker', {});
  const isActive = globals[WIDGET_KEY];

  useEffect(() => {
    if (!destination || isActive) {
      return;
    }

    markerSDK
      .loadWidget({
        destination: destination,
        ...config,
      })
      .then(() => {
        hideDefaultMarkerButton();
        updateGlobals({
          [WIDGET_KEY]: true,
        });
      });
  }, [destination]);

  const handleSendFeedback = useCallback(() => {
    window.Marker?.capture(mode);
  }, [mode, globals[WIDGET_KEY]]);

  return isActive ? (
    <Button
      style={{
        height: '28px',
        marginBlockStart: '6px',
        marginInlineStart: '4px',
      }}
      key={TOOL_ID}
      active={isActive}
      onClick={handleSendFeedback}
      outline
      small
    >
      Feedback
    </Button>
  ) : null;
}
