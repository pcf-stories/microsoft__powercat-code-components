import { StoryObj } from "@storybook/html";
//@ts-ignore
import storyHtml from "./Introduction.stories.html";

import "./Introduction.stories.css";

export default {
  title: "Introduction",
};

export const Introduction = {
  render: () => storyHtml,
  parameters: {
    controls: false,
  },
} as StoryObj;
