import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./PeoplePicker.render";
import {
  getFromResource,
  PersonaColumns,
  SuggestionColumns,
} from "./Components/PeoplePicker";
import { getArgTypes } from "./getArgTypes";

import "../../PeoplePicker/PeoplePicker/css/PeoplePicker.css";

const argTypes = {
  Theme: "text",
  AccessibilityLabel: "text",
  ShowSecondaryText: "boolean",
  Error: "boolean",
  MinimumSearchTermLength: "number",
  SearchTermToShortMessage: "text",
  NoResultFoundMessage: "text",
  SuggestionsHeaderText: "text",
  HintText: "text",
  MaxPeople: "number",
  PeoplePickerType: ["Normal People Picker", "Compact People Picker", "List People Picker"],
  InputEvent: "text",
  SearchText: "text",
  AutoHeight: "number",
  SelectedPeople: "object",
  personas: "object",
  suggestions: "object",
} as const;

export default {
  title: "PeoplePicker",
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      const container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "640px";
      container.style.border = "dotted 1px";
      container.style.resize = "both";
      container.style.overflow = "auto";

      const storyResult = Story();
      if (typeof storyResult === "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
} as Meta<StoryArgs>;

export const PeoplePicker = {
  render: renderGenerator(),
  args: {
    isDisabled: false,
    isVisible: true,
    Theme: "",
    AccessibilityLabel: "Choose people",
    ShowSecondaryText: true,
    Error: false,
    MinimumSearchTermLength: 2,
    SearchTermToShortMessage: "Continue typing...",
    NoResultFoundMessage: "No results found",
    SuggestionsHeaderText: "Suggested People",
    HintText: "Search people",
    MaxPeople: 5,
    PeoplePickerType: "Normal People Picker",
    InputEvent: "",
    SearchText: "",
    AutoHeight: 0,
    SelectedPeople: [],
    personas: [
      {
        myId: "1",
        [PersonaColumns.PersonaKey]: "megan-bowen",
        [PersonaColumns.PersonaName]: "Megan Bowen",
        [PersonaColumns.PersonaImgUrl]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
        [PersonaColumns.PersonaImageAlt]: "MB",
        [PersonaColumns.PersonaPresence]: "online",
        [PersonaColumns.PersonaOOF]: false,
        [PersonaColumns.PersonaRole]: "Product Designer",
      },
    ],
    suggestions: [
      {
        myId: "1",
        [SuggestionColumns.SuggestionKey]: "megan-bowen",
        [SuggestionColumns.SuggestionName]: "Megan Bowen",
        [SuggestionColumns.SuggestionImgUrl]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
        [SuggestionColumns.SuggestionImageAlt]: "MB",
        [SuggestionColumns.SuggestionPresence]: "online",
        [SuggestionColumns.SuggestionOOF]: false,
        [SuggestionColumns.SuggestionRole]: "Product Designer",
      },
      {
        myId: "2",
        [SuggestionColumns.SuggestionKey]: "diego-siciliano",
        [SuggestionColumns.SuggestionName]: "Diego Siciliano",
        [SuggestionColumns.SuggestionImgUrl]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png",
        [SuggestionColumns.SuggestionImageAlt]: "DS",
        [SuggestionColumns.SuggestionPresence]: "away",
        [SuggestionColumns.SuggestionOOF]: false,
        [SuggestionColumns.SuggestionRole]: "Engineering Manager",
      },
      {
        myId: "3",
        [SuggestionColumns.SuggestionKey]: "susie-simons",
        [SuggestionColumns.SuggestionName]: "Susie Simons",
        [SuggestionColumns.SuggestionImgUrl]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
        [SuggestionColumns.SuggestionImageAlt]: "SS",
        [SuggestionColumns.SuggestionPresence]: "busy",
        [SuggestionColumns.SuggestionOOF]: true,
        [SuggestionColumns.SuggestionRole]: "UX Researcher",
      },
    ],
  },
} as StoryObj<StoryArgs>;

export const CompactPeoplePicker = {
  render: renderGenerator(),
  args: {
    ...PeoplePicker.args,
    PeoplePickerType: "Compact People Picker",
    ShowSecondaryText: false,
  },
} as StoryObj<StoryArgs>;

export const ListPeoplePicker = {
  render: renderGenerator(),
  args: {
    ...PeoplePicker.args,
    PeoplePickerType: "List People Picker",
    ShowSecondaryText: true,
  },
} as StoryObj<StoryArgs>;
