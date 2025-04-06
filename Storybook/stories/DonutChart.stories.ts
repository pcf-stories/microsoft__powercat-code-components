import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons(/* optional base url */ undefined, { disableWarnings: true });

import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./DonutChart.render";
import { ItemColumns, getFromResource } from "./Components/DonutChart";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
  Title: "text",
  CustomColors: "boolean",
  HideLabel: "boolean",
  HideTooltip: "boolean",
  InnerRadius: "number",
  ShowLabelsInPercentage: "boolean",
  TabIndex: "number",
  Theme: "text",
  Tooltip: "text",
  ValueInsideDonut: "text",
  items: "object",
} as const;

export default {
  title: "DonutChart",
  argTypes: getArgTypes(argTypes, getFromResource),
} as Meta<StoryArgs>;

export const DonutChart = {
  render: renderGenerator(),
  args: {
    items: [
      {
        myId: "1",
        [ItemColumns.Key]: "item1",
        [ItemColumns.Legend]: "Item 1",
        [ItemColumns.Value]: 30,
        [ItemColumns.Color]: "Red",
      },
      {
        myId: "2",
        [ItemColumns.Key]: "item2",
        [ItemColumns.Legend]: "Item 2",
        [ItemColumns.Value]: 20,
        [ItemColumns.Color]: "Blue",
      },
    ],
    Theme: '{"palette": {"themePrimary": "#test-primary"}}',
    CustomColors: false,
    HideLabel: false,
    HideTooltip: false,
    InnerRadius: 35,
    isDisabled: false,
    isVisible: true,
    ShowLabelsInPercentage: false,
    TabIndex: -1,
    Title: "Donuts",
    Tooltip: "ShkoOnline's ComponentFramework-Mock Rocks",
    ValueInsideDonut: "Homer",
  },
} as StoryObj<StoryArgs>;
