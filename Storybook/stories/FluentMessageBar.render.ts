import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  EnumPropertyMock,
  StringPropertyMock,
  TwoOptionsPropertyMock,
} from "@shko.online/componentframework-mock";
import {
  FluentMessageBar as Component,
  IInputs,
  IOutputs,
  ItemColumns,
  resource,
} from "./Components/FluentMessageBar";
import { PCFStoryArgs } from "./PCFStoryArgs";

type ShapeType = "square" | "rounded";
type IntentType = "info" | "warning" | "error" | "success";

export interface StoryArgs extends PCFStoryArgs {
  Shape: ShapeType;
  Intent: IntentType;
  Title: string;
  Body: string;
  LinkText: string;
  URL: string;
  HideDismiss: boolean;
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
          Shape: EnumPropertyMock<ShapeType>,
          Intent: EnumPropertyMock<IntentType>,
          Title: StringPropertyMock,
          Body: StringPropertyMock,
          LinkText: StringPropertyMock,
          URL: StringPropertyMock,
          HideDismiss: TwoOptionsPropertyMock,
          Items: DataSetMock,
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
        Shape: args.Shape,
        Intent: args.Intent,
        Title: args.Title,
        Body: args.Body,
        LinkText: args.LinkText,
        URL: args.URL,
        HideDismiss: args.HideDismiss,
      });

      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

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
