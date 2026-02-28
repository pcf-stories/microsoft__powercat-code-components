import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons(/* optional base url */ undefined, { disableWarnings: true });

import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./StackedBarChart.render";
import { ItemColumns, getFromResource } from "./Components/StackedBarChart";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
  Title: "text",
  HideLegend: "boolean",
  BarHeight: "number",
  BarBackgroundColor: "color",
  HideTooltip: "boolean",
  CustomColors: "boolean",
  Theme: "text",
  AccessibilityLabel: "text",
  TabIndex: "number",
  Tooltip: "text",
  items: "object",
} as const;

export default {
  title: "StackedBarChart",
  argTypes: getArgTypes(argTypes, getFromResource),
} as Meta<StoryArgs>;

export const StackedBarChart = {
  render: renderGenerator(),
  args: {
    items: [
      {
        myId: "1",
        [ItemColumns.Title]: "Completed",
        [ItemColumns.Key]: "completed",
        [ItemColumns.Value]: 45,
        [ItemColumns.Color]: "#107C10",
        [ItemColumns.Callout]: "Completed: 45",
      },
      {
        myId: "2",
        [ItemColumns.Title]: "In Progress",
        [ItemColumns.Key]: "inprogress",
        [ItemColumns.Value]: 35,
        [ItemColumns.Color]: "#0078D4",
        [ItemColumns.Callout]: "In Progress: 35",
      },
      {
        myId: "3",
        [ItemColumns.Title]: "Blocked",
        [ItemColumns.Key]: "blocked",
        [ItemColumns.Value]: 20,
        [ItemColumns.Color]: "#A4262C",
        [ItemColumns.Callout]: "Blocked: 20",
      },
    ],
    Title: "Work Items",
    HideLegend: false,
    BarHeight: 15,
    BarBackgroundColor: "",
    HideTooltip: false,
    CustomColors: false,
    Theme: '{"palette": {"themePrimary": "#test-primary"}}',
    AccessibilityLabel: "Stacked bar chart showing work item distribution",
    TabIndex: -1,
    Tooltip: "Stacked bar chart",
    isDisabled: false,
    isVisible: true,
  },
} as StoryObj<StoryArgs>;

export const StackedBarChart_CustomColorsHiddenLegend = {
  render: renderGenerator(),
  args: {
    items: [
      {
        myId: "1",
        [ItemColumns.Title]: "Passed",
        [ItemColumns.Key]: "passed",
        [ItemColumns.Value]: 68,
        [ItemColumns.Color]: "#107C10",
        [ItemColumns.Callout]: "Passed: 68",
      },
      {
        myId: "2",
        [ItemColumns.Title]: "Skipped",
        [ItemColumns.Key]: "skipped",
        [ItemColumns.Value]: 22,
        [ItemColumns.Color]: "#FFB900",
        [ItemColumns.Callout]: "Skipped: 22",
      },
      {
        myId: "3",
        [ItemColumns.Title]: "Failed",
        [ItemColumns.Key]: "failed",
        [ItemColumns.Value]: 10,
        [ItemColumns.Color]: "#A4262C",
        [ItemColumns.Callout]: "Failed: 10",
      },
    ],
    Title: "Test Runs",
    HideLegend: true,
    BarHeight: 20,
    BarBackgroundColor: "#F3F2F1",
    HideTooltip: false,
    CustomColors: true,
    Theme: '{"palette": {"themePrimary": "#0078D4"}}',
    AccessibilityLabel: "Stacked bar chart with custom colors and hidden legend",
    TabIndex: -1,
    Tooltip: "Custom color variant",
    isDisabled: false,
    isVisible: true,
  },
} as StoryObj<StoryArgs>;
