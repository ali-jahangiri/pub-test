import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import App from './App';

export default {
  title: 'ReactComponentLibrary/Button',
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
};

export const ClickMe = Template.bind({});