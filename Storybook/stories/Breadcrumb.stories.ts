import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons(/* optional base url */);

import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./Breadcrumb.render";
import { ItemColumns, getFromResource } from "./Components/Breadcrumb";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
  LastSelected: 'text',
  Accessibility: "text",
  "Dataset Error": "boolean",
  MaxDisplayedItems: "number",
  OverflowIndex: "number",
  Theme: "text",
  items: "object",
} as const;

export default {
  title: "PCF Components/Breadcrumb",
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
      container.style.height = "80px";
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

export const Breadcrumb = {
  render: renderGenerator(),
  args: {
    items: [
      {
        myId: "1",
        [ItemColumns.Key]: 1,
        [ItemColumns.DisplayName]: "Text1",
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "2",
        [ItemColumns.Key]: 2,
        [ItemColumns.DisplayName]: "Text2",
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "3",
        [ItemColumns.Key]: 3,
        [ItemColumns.DisplayName]: "Text3",
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "4",
        [ItemColumns.Key]: 4,
        [ItemColumns.DisplayName]: "Text4",
        [ItemColumns.Clickable]: true,
      },
    ],
    OverflowIndex: 5,
    Accessibility: "Breadcrumb Component",
    Theme: JSON.stringify({
      palette: {
        themePrimary: "#test-primary",
      },
    }),
    MaxDisplayedItems: 4,
    "Dataset Error": false,
    LastSelected: "",
  },
} as StoryObj<StoryArgs>;

export const NoItems = {
  render: renderGenerator(),
  args: {
    items: [],
    "Dataset Error": true,
    OverflowIndex: 5,
    Accessibility: "Breadcrumb Component",
    Theme: JSON.stringify({
      palette: {
        themePrimary: "#test-primary",
      },
    }),
    MaxDisplayedItems: 4,
  },
} as StoryObj<StoryArgs>;
