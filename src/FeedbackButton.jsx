import { IconButton } from '@storybook/components';
import { CommentIcon } from '@storybook/icons';
import { useChannel, useParameter } from '@storybook/manager-api';
import { styled } from '@storybook/theming';
import React, { useCallback, useEffect, useState } from 'react';

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
  const { destination, project, mode, ...config } = useParameter('marker', {});

  const emit = useChannel({
    [EVENTS.LOADED]: () => {
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

  const loadMarkerOnManager = useCallback(() => {
    if ((!destination && !project) || markerLoaded || window.Marker) {
      return;
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
  }, [markerLoaded]);

  // If the decorator has not loaded within 3 seconds fallback to loading it on the manager.
  // Screenshots may appear unstyled, but it's better than no feedback button displaying.
  // This might happen on mdx docs stories where no decorators aren't called.
  useEffect(() => {
    setTimeout(loadMarkerOnManager, 3000);
  }, []);

  return markerLoaded ? (
    <IconButtonWithLabel key={TOOL_ID} onClick={handleSendFeedback}>
      <CommentIcon />
      <IconButtonLabel>Feedback</IconButtonLabel>
    </IconButtonWithLabel>
  ) : null;
}
