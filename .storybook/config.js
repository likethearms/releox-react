import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function loadStories() {
  require('../src/stories');
}
addDecorator(withInfo); // Globally in your .storybook/config.js.
configure(loadStories, module);
