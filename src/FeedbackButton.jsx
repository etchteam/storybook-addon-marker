import { IconButton } from '@storybook/components';
import { CommentIcon } from '@storybook/icons';
import { useChannel } from '@storybook/manager-api';
import { styled } from '@storybook/theming';
import React, { useCallback, useState } from 'react';

import { EVENTS, TOOL_ID } from './constants';

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

  const emit = useChannel({
    [EVENTS.LOADED]: () => {
      setMarkerLoaded(true);
    },
  });

  const handleSendFeedback = useCallback(() => {
    emit(EVENTS.CAPTURE);
  }, [emit]);

  return markerLoaded ? (
    <IconButtonWithLabel key={TOOL_ID} onClick={handleSendFeedback}>
      <CommentIcon />
      <IconButtonLabel>Feedback</IconButtonLabel>
    </IconButtonWithLabel>
  ) : null;
}
