import markerSDK from '@marker.io/browser';
import { CommentIcon } from '@storybook/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { IconButton } from 'storybook/internal/components';
import { useChannel, useGlobals } from 'storybook/manager-api';
import { styled } from 'storybook/theming';

import { EVENTS, TOOL_ID } from './constants';
import { hideDefaultMarkerButton } from './hideDefaultMarkerButton';

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

export default function FeedbackButton() {
  const [markerLoaded, setMarkerLoaded] = useState(false);
  const [globals] = useGlobals();
  const { project, mode, ...config } = globals.marker ?? {};

  const emit = useChannel({
    // The loaded event will fire when the marker decorator loads
    [EVENTS.LOADED]: () => {
      if (window.Marker) {
        // Unload the manager version of marker
        window.Marker.unload();
      }

      setMarkerLoaded(true);
    },
    [EVENTS.CAPTURE]: () => {
      window.Marker?.capture(mode)?.then(() => {
        hideDefaultMarkerButton(); // This sometimes reappears after capturing
      });
    },
  });

  const handleSendFeedback = useCallback(() => {
    emit(EVENTS.CAPTURE);
  }, [emit]);

  // If the decorator has not loaded within 3 seconds fallback to loading it on the manager.
  // Screenshots may appear unstyled, but it's better than no feedback button displaying.
  // This might happen on mdx docs stories where no decorators aren't called.
  useEffect(() => {
    clearTimeout(window.markerTimer);

    if (project && !markerLoaded && !window.Marker) {
      window.markerTimer = setTimeout(() => {
        markerSDK.loadWidget({ project, ...config }).then(() => {
          hideDefaultMarkerButton();
          setMarkerLoaded(true);
        });
      }, 3000);
    }
  }, [project, markerLoaded]);

  return markerLoaded ? (
    <IconButtonWithLabel key={TOOL_ID} onClick={handleSendFeedback}>
      <CommentIcon />
      <IconButtonLabel>Feedback</IconButtonLabel>
    </IconButtonWithLabel>
  ) : null;
}
