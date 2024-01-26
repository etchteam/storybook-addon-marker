import { useChannel } from '@storybook/api';
import { addons, types } from '@storybook/manager-api';
import { styled } from '@storybook/theming';
import { tint, shade } from 'polished';
import React, { useState } from 'react';

export const ADDON_ID = 'marker';

const StyledButton = styled.button`
  align-self: center;
  appearance: none;
  background: ${(props) =>
    `linear-gradient(to bottom, ${tint(0.05, props.theme.color.light)}, ${shade(
      0.05,
      props.theme.color.light,
    )})`};
  border: 0 none;
  border-radius: 0.25em;
  color: ${(props) => props.theme.color.darkest};
  cursor: pointer;
  padding: 0.25em 0.5em;
  user-select: none;

  &:hover {
    background: ${(props) =>
      `linear-gradient(to bottom, ${tint(
        0.05,
        props.theme.color.lighter,
      )}, ${shade(0.05, props.theme.color.lighter)})`};
  }
`;

const Button = () => {
  const [show, setShow] = useState(false);
  const emit = useChannel({
    showButton: (buttonShouldShow) => {
      setShow(buttonShouldShow);
    },
  });

  const handleClick = () => {
    emit('sendFeedback');
  };

  if (!show) {
    return null;
  }

  return <StyledButton onClick={handleClick}>Feedback</StyledButton>;
};

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Marker',
    type: types.TOOL,
    render: () => {
      return <Button />;
    },
  });
});
