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
  Facepile as Component,
  IInputs,
  IOutputs,
  ItemColumns,
  resource,
} from "./Components/Facepile";
import { PCFStoryArgs } from "./PCFStoryArgs";

type PersonaSizeType = "Size8" | "Size24" | "Size32" | "Size40" | "Size48" | "size56";
type OverflowButtonType = "none" | "descriptive" | "downArrow" | "more";

export interface StoryArgs extends PCFStoryArgs {
  AccessibilityLabel: string;
  Theme: string;
  MaxDisplayablePersonas: number;
  ImageShouldFadeIn: boolean;
  ShowAddButton: boolean;
  OverflowButtonAriaLabel: string;
  AddbuttonAriaLabel: string;
  PersonaSize: PersonaSizeType;
  OverflowButtonType: OverflowButtonType;
  InputEvent: string;
  EventName: string;
  items: {
    myId: string;
    [ItemColumns.DisplayName]: string;
    [ItemColumns.Key]: string;
    [ItemColumns.ImageInfo]?: string;
    [ItemColumns.Presence]?: string;
    [ItemColumns.IsImage]?: boolean;
    [ItemColumns.Clickable]?: boolean;
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
          AccessibilityLabel: StringPropertyMock,
          Theme: StringPropertyMock,
          MaxDisplayablePersonas: WholeNumberPropertyMock,
          ImageShouldFadeIn: TwoOptionsPropertyMock,
          ShowAddButton: TwoOptionsPropertyMock,
          OverflowButtonAriaLabel: StringPropertyMock,
          AddbuttonAriaLabel: StringPropertyMock,
          PersonaSize: EnumPropertyMock<PersonaSizeType>,
          OverflowButtonType: EnumPropertyMock<OverflowButtonType>,
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

      mockGenerator.onOutputChanged.callsFake((outputs) => {
        action("OutputChanged")(outputs);
        updateArgs({ EventName: outputs.EventName ?? "" });
      });

      mockGenerator.context._SetCanvasItems({
        AccessibilityLabel: args.AccessibilityLabel,
        Theme: args.Theme,
        MaxDisplayablePersonas: args.MaxDisplayablePersonas,
        ImageShouldFadeIn: args.ImageShouldFadeIn,
        ShowAddButton: args.ShowAddButton,
        OverflowButtonAriaLabel: args.OverflowButtonAriaLabel,
        AddbuttonAriaLabel: args.AddbuttonAriaLabel,
        PersonaSize: args.PersonaSize,
        OverflowButtonType: args.OverflowButtonType,
        InputEvent: args.InputEvent,
      });

      mockGenerator.SetControlResource(resource);
      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.context._parameters.AccessibilityLabel._SetValue(args.AccessibilityLabel);
      mockGenerator.context._parameters.Theme._SetValue(args.Theme);
      mockGenerator.context._parameters.MaxDisplayablePersonas._SetValue(args.MaxDisplayablePersonas);
      mockGenerator.context._parameters.ImageShouldFadeIn._SetValue(args.ImageShouldFadeIn);
      mockGenerator.context._parameters.ShowAddButton._SetValue(args.ShowAddButton);
      mockGenerator.context._parameters.OverflowButtonAriaLabel._SetValue(args.OverflowButtonAriaLabel);
      mockGenerator.context._parameters.AddbuttonAriaLabel._SetValue(args.AddbuttonAriaLabel);
      mockGenerator.context._parameters.PersonaSize._SetValue(args.PersonaSize);
      mockGenerator.context._parameters.OverflowButtonType._SetValue(args.OverflowButtonType);
      mockGenerator.context._parameters.InputEvent._SetValue(args.InputEvent);
      mockGenerator.context._parameters.items._InitItems(args.items || []);

      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};
