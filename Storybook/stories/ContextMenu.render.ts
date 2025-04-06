import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  EnumPropertyMock,
  StringPropertyMock,
  TwoOptionsPropertyMock,
  WholeNumberPropertyMock,
} from "@shko.online/componentframework-mock";
import {
  ContextMenu as Component,
  IInputs,
  IOutputs,
  ItemColumns,
  resource,
} from "./Components/ContextMenu";
import { PCFStoryArgs } from "./PCFStoryArgs";

export interface StoryArgs extends PCFStoryArgs {
  Accessibility: string;
  InputEvent: string;
  items: {
    myId: string;
    [ItemColumns.DisplayName]: string;
    [ItemColumns.IconName]: string;
    [ItemColumns.IconColor]: string;
    [ItemColumns.Enabled]?: boolean;
    [ItemColumns.IconOnly]?: boolean;
  }[];
  Theme: string;
  ContextSelected: string;
  Chevron: boolean,
  IconColor: string,
  HoverIconColor: string,
  IconSize: number,
  FontSize: number,
  FontColor: string,
  HoverFontColor: string,
  FillColor: string,
  HoverFillColor: string,
  BorderColor: string,
  HoverBorderColor: string,
  BorderRadius: number,
  TextAlignment: AlignmentTypes,
}

type AlignmentTypes = "0" /*'center'*/ | "1" /*'left' */ | "2" /*'right'*/;

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
          Chevron: TwoOptionsPropertyMock,
          IconColor: StringPropertyMock,
          HoverIconColor: StringPropertyMock,
          IconSize: WholeNumberPropertyMock,
          FontSize: WholeNumberPropertyMock,
          FontColor: StringPropertyMock,
          HoverFontColor: StringPropertyMock,
          FillColor: StringPropertyMock,
          HoverFillColor: StringPropertyMock,
          BorderColor: StringPropertyMock,
          HoverBorderColor: StringPropertyMock,
          BorderRadius: WholeNumberPropertyMock,
          TextAlignment: EnumPropertyMock<AlignmentTypes>,
          AccessibilityLabel: StringPropertyMock,
          Theme: StringPropertyMock,
          InputEvent: StringPropertyMock,
          items: DataSetMock,
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
        ["myId", ItemColumns.DisplayName, "!!items"]
      );

      mockGenerator.context._parameters.items._InitItems(args.items || []);

      mockGenerator.context._parameters.items.openDatasetItem.callsFake(
        (item) => {
          console.log(item.id);
          action("OpenDatasetItem")(item);
          updateArgs({ ContextSelected: item.name });
        }
      );

      mockGenerator.context._SetCanvasItems({
        Theme: args.Theme,
        AccessibilityLabel: args.Accessibility,
        InputEvent: args.InputEvent,
        Chevron: args.Chevron,
        IconColor: args.IconColor,
        HoverIconColor: args.HoverIconColor,
        IconSize: args.IconSize,
        FontSize: args.FontSize,
        FontColor: args.FontColor,
        HoverFontColor: args.HoverFontColor,
        FillColor: args.FillColor,
        HoverFillColor: args.HoverFillColor,
        BorderColor: args.BorderColor,
        HoverBorderColor: args.HoverBorderColor,
        BorderRadius: args.BorderRadius,
        TextAlignment: args.TextAlignment,        
      });
     
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

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
