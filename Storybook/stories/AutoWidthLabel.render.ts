import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import {
  ComponentFrameworkMockGenerator,
  DecimalNumberPropertyMock,
  EnumPropertyMock,
  StringPropertyMock,
  WholeNumberPropertyMock,
} from "@shko.online/componentframework-mock";
import { AutoWidthLabel, IInputs, IOutputs } from "./Components/AutoWidthLabel";
import { PCFStoryArgs } from "./PCFStoryArgs";

export interface StoryArgs extends PCFStoryArgs {
  BorderColor: string;
  BorderRadius: number;
  BorderThickness: number;
  DisabledBorderColor: string;
  DisabledFillColor: string;
  DisabledFontColor: string;
  DisabledFontWeight: string;
  FillColor: string;
  FocusBorderColor: string;
  FocusBorderThickness: number;
  FocusFillColor: string;
  FocusFontColor: string;
  FocusFontWeight: string;
  FontColor: string;
  FontName: string;
  FontSize: number;
  FontSizeUnits: "0" | "1";
  FontWeight: string;
  HoverBorderColor: string;
  HoverBorderThickness: number;
  HoverFillColor: string;
  HoverFontColor: string;
  HoverFontWeight: string;
  PaddingBottom: number;
  PaddingLeft: number;
  PaddingRight: number;
  PaddingTop: number;
  Text: string;
}

export const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

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
      container.className = "AutoWidthLabel";
      mockGenerator = new ComponentFrameworkMockGenerator(
        AutoWidthLabel,
        {
          BorderColor: StringPropertyMock,
          BorderRadius: WholeNumberPropertyMock,
          BorderThickness: WholeNumberPropertyMock,
          DisabledBorderColor: StringPropertyMock,
          DisabledFillColor: StringPropertyMock,
          DisabledFontColor: StringPropertyMock,
          DisabledFontWeight: StringPropertyMock,
          FillColor: StringPropertyMock,
          FocusBorderColor: StringPropertyMock,
          FocusBorderThickness: WholeNumberPropertyMock,
          FocusFillColor: StringPropertyMock,
          FocusFontColor: StringPropertyMock,
          FocusFontWeight: StringPropertyMock,
          FontColor: StringPropertyMock,
          FontName: StringPropertyMock,
          FontSize: DecimalNumberPropertyMock,
          FontSizeUnits: EnumPropertyMock,
          FontWeight: StringPropertyMock,
          HoverBorderColor: StringPropertyMock,
          HoverBorderThickness: WholeNumberPropertyMock,
          HoverFillColor: StringPropertyMock,
          HoverFontColor: StringPropertyMock,
          HoverFontWeight: StringPropertyMock,
          PaddingBottom: WholeNumberPropertyMock,
          PaddingLeft: WholeNumberPropertyMock,
          PaddingRight: WholeNumberPropertyMock,
          PaddingTop: WholeNumberPropertyMock,
          Text: StringPropertyMock,
        },
        container,
        {
          Text: "string",
          AutoWidth: "number",
        }
      );

      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.context._SetCanvasItems({
        BorderColor: args.BorderColor,
        BorderRadius: args.BorderRadius,
        BorderThickness: args.BorderThickness,
        DisabledBorderColor: args.DisabledBorderColor,
        DisabledFillColor: args.DisabledFillColor,
        DisabledFontColor: args.DisabledFontColor,
        DisabledFontWeight: args.DisabledFontWeight,
        FillColor: args.FillColor,
        FocusBorderColor: args.FocusBorderColor,
        FocusBorderThickness: args.FocusBorderThickness,
        FocusFillColor: args.FocusFillColor,
        FocusFontColor: args.FocusFontColor,
        FocusFontWeight: args.FocusFontWeight,
        FontColor: args.FontColor,
        FontName: args.FontName,
        FontSize: args.FontSize,
        FontSizeUnits: args.FontSizeUnits,
        FontWeight: args.FontWeight,
        HoverBorderColor: args.HoverBorderColor,
        HoverBorderThickness: args.HoverBorderThickness,
        HoverFillColor: args.HoverFillColor,
        HoverFontColor: args.HoverFontColor,
        HoverFontWeight: args.HoverFontWeight,
        PaddingBottom: args.PaddingBottom,
        PaddingLeft: args.PaddingLeft,
        PaddingRight: args.PaddingRight,
        PaddingTop: args.PaddingTop,
        Text: args.Text,
      });

      mockGenerator.onOutputChanged.callsFake(({ AutoWidth }) => {
        action("Autowidth")(AutoWidth);
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context._parameters.Text._SetValue(args.Text);
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};
