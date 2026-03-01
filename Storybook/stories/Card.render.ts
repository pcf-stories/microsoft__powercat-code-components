import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  EnumPropertyMock,
  EventsBagMock,
  StringPropertyMock,
  WholeNumberPropertyMock,
} from "@shko.online/componentframework-mock";
import { Card as Component, IInputs, IOutputs, ItemColumns, resource } from "./Components/Card";
import { PCFStoryArgs } from "./PCFStoryArgs";

type ImagePlacementType = "Above header" | "Below header";
type SizeType = "Small" | "Medium" | "Large";
type AlignmentType = "Vertical" | "Horizontal";

export interface ImagePropertyValue {
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileContent: string;
  fileUrl: string;
}

export interface StoryArgs extends PCFStoryArgs {
  AccessibleLabel: string;
  Title: string;
  Subtitle: string;
  Description: string;
  HeaderImage: ImagePropertyValue;
  Image: ImagePropertyValue;
  ImagePlacement: ImagePlacementType;
  Size: SizeType;
  Alignment: AlignmentType;
  SelectedItem: string;
  items: {
    myId: string;
    [ItemColumns.DisplayName]: string;
    [ItemColumns.Key]: string;
    [ItemColumns.IconName]?: string;
    [ItemColumns.IconStyle]?: string;
    [ItemColumns.Appearance]?: string;
    [ItemColumns.Tooltip]?: string;
    [ItemColumns.Visible]?: boolean;
    [ItemColumns.Disabled]?: boolean;
  }[];
}

export const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );

    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGeneratorReact(
        Component,
        {
          AccessibleLabel: StringPropertyMock,
          Title: StringPropertyMock,
          Subtitle: StringPropertyMock,
          Description: StringPropertyMock,
          HeaderImage: StringPropertyMock,
          Image: StringPropertyMock,
          ImagePlacement: EnumPropertyMock<ImagePlacementType>,
          Size: EnumPropertyMock<SizeType>,
          Alignment: EnumPropertyMock<AlignmentType>,
          Items: DataSetMock,
          TabIndex: WholeNumberPropertyMock,
          Tooltip: StringPropertyMock
        },
        {}
      );

      mockGenerator.metadata.db.exec(
        `UPDATE
          Metadata__Entity
         SET
          PrimaryIdAttribute = ? ,
          PrimaryNameAttribute = ?
         WHERE
          LogicalName = ?`,
        ["myId", ItemColumns.DisplayName, "!!Items"]
      );

      mockGenerator.context._parameters.Items._InitItems(args.items || []);
      mockGenerator.context._parameters.Items.openDatasetItem.callsFake((item) => {
        action("OpenDatasetItem")(item);
        updateArgs({ SelectedItem: item.name });
      });

      mockGenerator.context._SetCanvasItems({
        AccessibleLabel: args.AccessibleLabel,
        Title: args.Title,
        Subtitle: args.Subtitle,
        Description: args.Description,
        HeaderImage: args.HeaderImage as unknown as string,
        Image: args.Image as unknown as string,
        ImagePlacement: args.ImagePlacement,
        Size: args.Size,
        Alignment: args.Alignment,
      });

      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      (mockGenerator.context.events as EventsBagMock).OnSelect.callsFake(() => {
        action("OnSelect")();
      });

      mockGenerator.onOutputChanged.callsFake((outputs) => {
        action("OutputChanged")(outputs);
      });

      mockGenerator.SetControlResource(resource);
      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};