import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons(/* optional base url */);

import { Meta, StoryObj } from "@storybook/html";
import { getFromResource } from "./Components/AutoWidthLabel";
import { StoryArgs, renderGenerator } from "./AutoWidthLabel.render";
import { getArgTypes } from "./getArgTypes";

import "../../AutoWidthLabel/AutoWidthLabel/css/AutoWidthLabel.css";

const argTypes = {
  BorderColor: "color",
  BorderRadius: "number",
  BorderThickness: "number",
  DisabledBorderColor: "color",
  DisabledFillColor: "color",
  DisabledFontColor: "color",
  DisabledFontWeight: "text",
  FillColor: "color",
  FocusBorderColor: "color",
  FocusBorderThickness: "number",
  FocusFillColor: "color",
  FocusFontColor: "color",
  FocusFontWeight: "text",
  FontColor: "color",
  FontName: "text",
  FontSize: "number",
  FontSizeUnits: ["0", "1"],
  FontWeight: "text",
  HoverBorderColor: "color",
  HoverBorderThickness: "number",
  HoverFillColor: "color",
  HoverFontColor: "color",
  HoverFontWeight: "text",
  PaddingBottom: "number",
  PaddingLeft: "number",
  PaddingRight: "number",
  PaddingTop: "number",
  Text: "text",
} as const;

export default {
  title: "PCF Components/AutoWidthLabel",
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1.5em";
      container.style.width = "640px";
      container.style.height = "50px";
      container.style.border = "dotted 1px";
      container.style.resize = "both";
      container.style.overflow = "auto";
      container.style.position = "relative";
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

export const AutoWidthLabel = {
  render: renderGenerator(),
  args: {
    Text: "@shko.online/componentframework-mock Rocks ;)",
  },
} as StoryObj<StoryArgs>;
