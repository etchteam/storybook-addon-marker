import markerSDK from '@marker.io/browser';
import { IconButton } from '@storybook/components';
import { CommentIcon } from '@storybook/icons';
import { useParameter } from '@storybook/manager-api';
import { styled } from '@storybook/theming';
import React, { useCallback, useEffect, useState } from 'react';

import { TOOL_ID } from './constants';

const IconButtonWithLabel = styled(IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
}));

const IconButtonLabel = styled.div(({ theme }) => ({
  display: 'inline-block',
  textDecoration: 'none',
  padding: '10px 5px',
  fontWeight: theme.typography.weight.bold,
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: '1',
  height: 37,
  border: 'none',
  borderTop: '3px solid transparent',
  borderBottom: '3px solid transparent',
  background: 'transparent',
}));

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
    <IconButtonWithLabel key={TOOL_ID} onClick={handleSendFeedback}>
      <CommentIcon />
      <IconButtonLabel>Feedback</IconButtonLabel>
    </IconButtonWithLabel>
  ) : null;
}
