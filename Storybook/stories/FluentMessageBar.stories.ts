import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./FluentMessageBar.render";
import { ItemColumns, getFromResource } from "./Components/FluentMessageBar";
import { getArgTypes } from "./getArgTypes";

import "../../FluentMessageBar/FluentMessageBar/css/messagebar.css";

const argTypes = {
  Shape: ["square", "rounded"],
  Intent: ["info", "warning", "error", "success"],
  Title: "text",
  Body: "text",
  LinkText: "text",
  URL: "text",
  HideDismiss: "boolean",
  SelectedItem: "text",
  items: "object",
} as const;

export default {
  title: "FluentMessageBar",
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
      container.style.border = "dotted 1px";
      container.style.resize = "both";
      container.style.overflow = "auto";

      var storyResult = Story();
      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
} as Meta<StoryArgs>;

export const FluentMessageBar = {
  render: renderGenerator(),
  args: {
    Shape: "square",
    Intent: "info",
    Title: "Information",
    Body: "This is a Fluent Message Bar story for PowerCAT components.",
    LinkText: "Learn more",
    URL: "https://react.fluentui.dev/?path=/docs/components-messagebar--docs",
    HideDismiss: false,
    SelectedItem: "",
    items: [
      {
        myId: "1",
        [ItemColumns.DisplayName]: "Contact",
        [ItemColumns.Key]: "mail",
        [ItemColumns.IconName]: "Mail",
        [ItemColumns.IconStyle]: "Regular",
        [ItemColumns.Appearance]: "",
        [ItemColumns.Tooltip]: "Send mail",
        [ItemColumns.Visible]: true,
        [ItemColumns.Disabled]: false,
      },
      {
        myId: "2",
        [ItemColumns.DisplayName]: "Chat",
        [ItemColumns.Key]: "chat",
        [ItemColumns.IconName]: "Chat",
        [ItemColumns.IconStyle]: "Regular",
        [ItemColumns.Appearance]: "",
        [ItemColumns.Tooltip]: "Open chat",
        [ItemColumns.Visible]: true,
        [ItemColumns.Disabled]: false,
      },
    ],
  },
} as StoryObj<StoryArgs>;
