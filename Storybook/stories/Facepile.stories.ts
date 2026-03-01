import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./Facepile.render";
import { ItemColumns, getFromResource } from "./Components/Facepile";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
  AccessibilityLabel: "text",
  Theme: "text",
  MaxDisplayablePersonas: "number",
  ImageShouldFadeIn: "boolean",
  ShowAddButton: "boolean",
  OverflowButtonAriaLabel: "text",
  AddbuttonAriaLabel: "text",
  PersonaSize: ["Size8", "Size24", "Size32", "Size40", "Size48", "size56"],
  OverflowButtonType: ["none", "descriptive", "downArrow", "more"],
  InputEvent: "text",
  EventName: "text",
  items: "object",
} as const;

export default {
  title: "Facepile",
  argTypes: getArgTypes(argTypes, getFromResource),
  decorators: [
    (Story) => {
      const container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.width = "480px";
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

export const Facepile = {
  render: renderGenerator(),
  args: {
    isDisabled: false,
    isVisible: true,
    AccessibilityLabel: "Team members",
    Theme: "",
    MaxDisplayablePersonas: 5,
    ImageShouldFadeIn: true,
    ShowAddButton: true,
    OverflowButtonAriaLabel: "Show more people",
    AddbuttonAriaLabel: "Add a new person",
    PersonaSize: "Size32",
    OverflowButtonType: "descriptive",
    InputEvent: "",
    EventName: "",
    items: [
      {
        myId: "1",
        [ItemColumns.DisplayName]: "Megan Bowen",
        [ItemColumns.Key]: "megan-bowen",
        [ItemColumns.ImageInfo]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
        [ItemColumns.Presence]: "online",
        [ItemColumns.IsImage]: false,
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "2",
        [ItemColumns.DisplayName]: "Diego Siciliano",
        [ItemColumns.Key]: "diego-siciliano",
        [ItemColumns.ImageInfo]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png",
        [ItemColumns.Presence]: "away",
        [ItemColumns.IsImage]: false,
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "3",
        [ItemColumns.DisplayName]: "Allan Deyoung",
        [ItemColumns.Key]: "allan-deyoung",
        [ItemColumns.ImageInfo]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png",
        [ItemColumns.Presence]: "busy",
        [ItemColumns.IsImage]: false,
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "4",
        [ItemColumns.DisplayName]: "Pradeep Gupta",
        [ItemColumns.Key]: "pradeep-gupta",
        [ItemColumns.ImageInfo]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png",
        [ItemColumns.Presence]: "offline",
        [ItemColumns.IsImage]: false,
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "5",
        [ItemColumns.DisplayName]: "Susie Simons",
        [ItemColumns.Key]: "susie-simons",
        [ItemColumns.ImageInfo]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
        [ItemColumns.Presence]: "dnd",
        [ItemColumns.IsImage]: false,
        [ItemColumns.Clickable]: true,
      },
      {
        myId: "6",
        [ItemColumns.DisplayName]: "Patti Fernandez",
        [ItemColumns.Key]: "patti-fernandez",
        [ItemColumns.ImageInfo]:
          "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png",
        [ItemColumns.Presence]: "none",
        [ItemColumns.IsImage]: false,
        [ItemColumns.Clickable]: true,
      },
    ],
  },
} as StoryObj<StoryArgs>;
