import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons(/* optional base url */);

import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./ContextMenu.render";
import { ItemColumns, getFromResource } from "./Components/ContextMenu";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
  InputEvent: "text",
  Accessibility: "text",
  Theme: "text",
  items: "object",
  ContextSelected: "text",
  Chevron: "boolean",
  IconColor: "color",
  HoverIconColor: "color",
  IconSize: "number",
  FontSize: "number",
  FontColor: "color",
  HoverFontColor: "color",
  FillColor: "color",
  HoverFillColor: "color",
  BorderColor: "color",
  HoverBorderColor: "color",
  BorderRadius: "number",
  TextAlignment: ["0","1","2"],
} as const;

export default {
  title: "PCF Components/ContextMenu",
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
      //container.style.height = "100px";
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

export const ContextMenu = {
  render: renderGenerator(),
  args: {
    items: [{
      myId: '1',
      [ItemColumns.DisplayName]: 'Item 2',
      [ItemColumns.IconName]: "World",
      [ItemColumns.IconColor]: 'green',
    }, {
      myId: '2',  
      [ItemColumns.DisplayName]: 'Open',
      [ItemColumns.IconName]: "OpenInNewWindow",
      [ItemColumns.IconColor]: "blue",
    }, {
      myId: '3',  
      [ItemColumns.DisplayName]: 'New',
      [ItemColumns.IconName]: "NewFolder",
      [ItemColumns.IconColor]: 'red',
    },  
    {
      myId: '4',
      [ItemColumns.DisplayName]: "Settings",
      [ItemColumns.IconName]: "Settings",
      [ItemColumns.IconColor]: "peach",
      [ItemColumns.Enabled]: true,
      [ItemColumns.IconOnly]: true,
    },
    {
      myId: '5',
      [ItemColumns.DisplayName]: 'Save',
      [ItemColumns.IconName]: 'Save',
      [ItemColumns.IconColor]: 'black',
      [ItemColumns.Enabled]: true,
      [ItemColumns.IconOnly]: true,
    },
    ],
    Accessibility: 'Context Menu',
    BorderColor: '',
    BorderRadius: 0,
    Chevron: true,
    FillColor: '',
    FontColor: '',
    FontSize: 0,
    ContextSelected: '',
    HoverBorderColor: '',
    HoverFillColor:'',
    HoverFontColor: '',
    HoverIconColor: '',
    IconColor: '',
    IconSize: 0,
    InputEvent: '',
    TextAlignment: '0',
    Theme: '{"palette": {"themePrimary": "#test-primary"}}'
  },
} as StoryObj<StoryArgs>;
