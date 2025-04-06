import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons(/* optional base url */);

import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./CommandBar.render";
import { ItemColumns, getFromResource } from "./Components/CommandBar";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
  InputEvent: "text",
  Accessibility: "text",
  Theme: "text",
  items: "object",
} as const;

export default {
  title: "PCF Components/CommandBar",
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
    //  container.style.height = "80px";
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

export const CommandBar = {
  render: renderGenerator(),
  args: {
    items: [
      {
        myId: "1",
        [ItemColumns.DisplayName]: "Open Pane",
        [ItemColumns.Key]: "OpenPane",
        [ItemColumns.IconName]: "OpenPane",
        [ItemColumns.IconColor]: "blue",
      },
      {
        myId: "2",
        [ItemColumns.DisplayName]: "Open In New Window",
        [ItemColumns.Key]: "OpenInNewWindow",
        [ItemColumns.IconName]: "OpenInNewWindow",
        [ItemColumns.IconColor]: "blue",
      },
      {
        myId: "3",
        [ItemColumns.Key]: "commandSave",
        [ItemColumns.DisplayName]: "Save",
        [ItemColumns.IconName]: "Save",
        [ItemColumns.IconColor]: "green",
      },
      {
        myId: "5",
        [ItemColumns.Key]: "commandSettings",
        [ItemColumns.DisplayName]: "Settings",
        [ItemColumns.IconName]: "Settings",
        [ItemColumns.IconColor]: "black",
      },
      {
        myId: "6",
        [ItemColumns.Key]: "commandSaveAndClose",
        [ItemColumns.DisplayName]: "Save And Close",
        [ItemColumns.IconName]: "Save",
        [ItemColumns.IconColor]: "green",
      },
      // Sub Items Second Level
      {
        myId: "7",
        [ItemColumns.Key]: "commandUpload",
        [ItemColumns.DisplayName]: "Upload",
        [ItemColumns.IconName]: "Upload",
        [ItemColumns.IconColor]: "blue",
      },
      {
        myId: "8",
        [ItemColumns.Key]: "commandDownload",
        [ItemColumns.DisplayName]: "Download",
        [ItemColumns.IconName]: "Download",
        [ItemColumns.IconColor]: "red",
      },
    ],
    Theme: '{"palette": {"themePrimary": "#test-primary"}}',
    InputEvent: "SetFocus",
    Accessibility: "Command Bar component",
  },
} as StoryObj<StoryArgs>;
