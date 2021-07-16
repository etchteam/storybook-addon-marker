import React, { useEffect, useState } from 'react';
import { addons, types } from '@storybook/addons';
import { styled } from '@storybook/theming';
import { useParameter } from '@storybook/api';
import markerSDK from '@marker.io/browser';
import { tint, shade } from 'polished';

export const ADDON_ID = 'marker';

const StyledButton = styled.button`
  align-self: center;
  appearance: none;
  background: ${(props) => `linear-gradient(to bottom, ${tint(0.05, props.theme.color.light)}, ${shade(0.05, props.theme.color.light)})`};
  border: 0 none;
  border-radius: .25em;
  color: ${(props) => props.theme.color.darkest};
  cursor: pointer;
  padding: .25em .5em;
  user-select: none;

  &:hover {
    background: ${(props) => `linear-gradient(to bottom, ${tint(0.05, props.theme.color.lighter)}, ${shade(0.05, props.theme.color.lighter)})`};
  }
`;

const hideDefaultMarkerButton = () => {
  const markerBtns = [...document.querySelectorAll('.marker-app #feedback-button')];
  markerBtns.forEach(markerBtn => markerBtn.style.display = 'none');
}

const Button = () => {
  const [widget, setWidget] = useState(false);
  const { destination, ...config } = useParameter('marker', {});

  useEffect(() => {
    if (!destination) {
      return;
    }

    markerSDK.loadWidget({
      destination: destination,
      ...config
    }).then((markerWidget) => {
      hideDefaultMarkerButton();
      setWidget(markerWidget);
    });
  }, [destination]);

  if (!widget) {
    return null;
  }

  return (
    <StyledButton onClick={() => widget.capture()}>
      Feedback
    </StyledButton>
  );
}

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Marker',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => {
      return <Button />;
    },
  });
});