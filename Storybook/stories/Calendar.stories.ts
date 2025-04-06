import { initializeIcons } from "@fluentui/react/lib/Icons";

initializeIcons(/* optional base url */ undefined, { disableWarnings: true });

import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./Calendar.render";
import { getFromResource } from "./Components/Calendar";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
  AccessibilityLabel: "text",
  BackgroundColor: "color",
  DayPickerVisible: "boolean",
  FirstDayOfWeek: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  HighlightCurrentMonth: "boolean",
  HighlightSelectedMonth: "boolean",
  InputEvent: "text",
  Language: [
    "en-us",
    "bg-bg",
    "ca-es",
    "da-dk",
    "de-de",
    "el-gr",
    "es-es",
    "et-ee",
    "eu-es",
    "fi-fi",
    "fr-ca",
    "fr-fr",
    "hu-hu",
    "it-it",
    "ja-jp",
    "lt-lt",
    "lv-lv",
    "nb-no",
    "nl-nl",
    "pl-pl",
    "pt-bt",
    "pt-pt",
    "ro-ro",
    "ru-ru",
    "sk-sk",
    "sr-latn-rs",
    "sv-se",
    "tr-tr",
    "vi-vn",
    "zh-cn",
    "zh-tw",
  ],
  MaxDate: "date",
  MinDate: "date",
  MonthPickerVisible: "boolean",
  SelectedDateValue: "date",
  ShowGoToToday: "boolean",
  ShowSixWeeksByDefault: "boolean",
  ShowWeekNumbers: "boolean",
  Theme: "text",
} as const;

export default {
  title: "Calendar",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
      //container.style.height = "480px";
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

export const Calendar = {
  render: renderGenerator(),
  args: {
    AccessibilityLabel: "This is a calendar",
    BackgroundColor: "#bcd3eb",
    DayPickerVisible: true,
    FirstDayOfWeek: "Monday",
    HighlightCurrentMonth: true,
    HighlightSelectedMonth: true,
    InputEvent: "",
    Language: "en-us",
    MaxDate: new Date(2099, 0, 1),
    MinDate: new Date(2001, 0, 1),
    MonthPickerVisible: true,
    SelectedDateValue: new Date(),
    ShowGoToToday: true,
    ShowSixWeeksByDefault: false,
    ShowWeekNumbers: true,
    Theme: '{"palette": {"themePrimary": "#test-primary"}}',
  },
} as StoryObj<StoryArgs>;
