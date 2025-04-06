import type { Preview } from "@storybook/html";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        includeNames: true,
        order: ["Introduction"],
      },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout
    layout: "fullscreen",
    backgrounds: {
      values: [{ name: "white", value: "#fff" }],
    },
  },
  argTypes: {
    isDisabled: {
      name: "Disabled",
      control: "boolean",
      table: {
        category: "Mode",
        defaultValue: { summary: "false" },
      },
    },
    isVisible: {
      name: "Visible",
      control: "boolean",
      table: {
        category: "Mode",
        defaultValue: { summary: "true" },
      },
    },
  },
  args: {
    isDisabled: false,
    isVisible: true,
  },
};

export default preview;
