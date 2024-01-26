import { addons, types } from '@storybook/manager-api';

import FeedbackButton from './FeedbackButton';
import { ADDON_ID, TOOL_ID } from './constants';

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Marker',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: FeedbackButton,
  });
});
