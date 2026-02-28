import { Meta, StoryObj } from "@storybook/html";
import { StoryArgs, renderGenerator } from "./Card.render";
import { ItemColumns, getFromResource } from "./Components/Card";
import { getArgTypes } from "./getArgTypes";

const argTypes = {
	AccessibleLabel: "text",
	Title: "text",
	Subtitle: "text",
	Description: "text",
	HeaderImage: "object",
	Image: "object",
	ImagePlacement: ["Above header", "Below header"],
	Size: ["Small", "Medium", "Large"],
	Alignment: ["Vertical", "Horizontal"],
	items: "object",
	SelectedItem: "text",
} as const;

export default {
	title: "Card",
	argTypes: getArgTypes(argTypes, getFromResource),
	decorators: [
		(Story) => {
			var container = document.createElement("div");
			container.style.margin = "2em";
			container.style.padding = "1em";
			container.style.width = "420px";
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

const headerImage = {
	fileName: "header-image.svg",
	fileSize: 2000,
	mimeType: "image/svg+xml",
	fileContent: "",
	fileUrl:
		"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'><rect width='44' height='44' rx='4' fill='%230078D4'/><text x='22' y='27' text-anchor='middle' font-size='16' fill='white' font-family='Segoe UI, Arial, sans-serif'>PC</text></svg>",
};

const previewImage = {
	fileName: "preview-image.svg",
	fileSize: 6000,
	mimeType: "image/svg+xml",
	fileContent: "",
	fileUrl:
		"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='300' viewBox='0 0 600 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23C7E0F4'/><stop offset='100%' stop-color='%230078D4'/></linearGradient></defs><rect width='600' height='300' fill='url(%23g)'/><text x='300' y='160' text-anchor='middle' font-size='36' fill='white' font-family='Segoe UI, Arial, sans-serif'>Card Preview</text></svg>",
};

export const Card = {
	render: renderGenerator(),
	args: {
		isDisabled: false,
		isVisible: true,
		AccessibleLabel: "Card component",
		Title: "Product update",
		Subtitle: "New release available",
		Description: "Track progress, read highlights, and open quick actions from this card.",
		HeaderImage: headerImage,
		Image: previewImage,
		ImagePlacement: "Above header",
		Size: "Medium",
		Alignment: "Vertical",
		SelectedItem: "",
		items: [
			{
				myId: "1",
				[ItemColumns.DisplayName]: "Open",
				[ItemColumns.Key]: "open",
				[ItemColumns.IconName]: "Open",
				[ItemColumns.IconStyle]: "Regular",
				[ItemColumns.Appearance]: "",
				[ItemColumns.Tooltip]: "Open details",
				[ItemColumns.Visible]: true,
				[ItemColumns.Disabled]: false,
			},
			{
				myId: "2",
				[ItemColumns.DisplayName]: "Share",
				[ItemColumns.Key]: "share",
				[ItemColumns.IconName]: "Share",
				[ItemColumns.IconStyle]: "Regular",
				[ItemColumns.Appearance]: "",
				[ItemColumns.Tooltip]: "Share card",
				[ItemColumns.Visible]: true,
				[ItemColumns.Disabled]: false,
			},
			{
				myId: "3",
				[ItemColumns.DisplayName]: "Delete",
				[ItemColumns.Key]: "delete",
				[ItemColumns.IconName]: "Delete",
				[ItemColumns.IconStyle]: "Regular",
				[ItemColumns.Appearance]: "subtle",
				[ItemColumns.Tooltip]: "Delete item",
				[ItemColumns.Visible]: true,
				[ItemColumns.Disabled]: true,
			},
		],
	},
} as StoryObj<StoryArgs>;

export const Horizontal = {
	render: renderGenerator(),
	args: {
		...Card.args,
		Alignment: "Horizontal",
		ImagePlacement: "Below header",
		Size: "Large",
	},
} as StoryObj<StoryArgs>;

export const NoToolbarItems = {
	render: renderGenerator(),
	args: {
		...Card.args,
		Title: "Simple card",
		Subtitle: "Without actions",
		Description: "This variant renders content without toolbar items.",
		items: [],
	},
} as StoryObj<StoryArgs>;
