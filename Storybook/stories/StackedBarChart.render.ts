import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  StringPropertyMock,
  TwoOptionsPropertyMock,
  WholeNumberPropertyMock,
} from "@shko.online/componentframework-mock";
import {
  IInputs,
  IOutputs,
  ItemColumns,
  resource,
  StackedBarChart as Component,
} from "./Components/StackedBarChart";
import { PCFStoryArgs } from "./PCFStoryArgs";

export interface StoryArgs extends PCFStoryArgs {
  items: {
    myId: string;
    [ItemColumns.Title]: string;
    [ItemColumns.Key]: string;
    [ItemColumns.Value]: number;
    [ItemColumns.Color]: string;
    [ItemColumns.Callout]: string;
  }[];
  Title: string;
  HideLegend: boolean;
  BarHeight: number;
  BarBackgroundColor: string;
  HideTooltip: boolean;
  CustomColors: boolean;
  Theme: string;
  AccessibilityLabel: string;
  TabIndex: number;
  Tooltip: string;
}

export const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGeneratorReact<IInputs, IOutputs>;

  return function () {
    const [args] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );

    if (!container) {
      container = document.createElement("div");
      container.style.margin = "2em";
      container.style.width = "450px";
      container.style.height = "260px";
      container.style.border = "dotted 1px";
      container.style.resize = "both";
      container.style.overflow = "auto";

      mockGenerator = new ComponentFrameworkMockGeneratorReact(
        Component,
        {
          items: DataSetMock,
          Title: StringPropertyMock,
          HideLegend: TwoOptionsPropertyMock,
          BarHeight: WholeNumberPropertyMock,
          BarBackgroundColor: StringPropertyMock,
          HideTooltip: TwoOptionsPropertyMock,
          CustomColors: TwoOptionsPropertyMock,
          Theme: StringPropertyMock,
          AccessibilityLabel: StringPropertyMock,
          TabIndex: WholeNumberPropertyMock,
          Tooltip: StringPropertyMock,
        },
        {}
      );

      mockGenerator.metadata.db.exec(
        `UPDATE
          Metadata__Entity
         SET
          PrimaryIdAttribute = ?,
          PrimaryNameAttribute = ?
         WHERE
          LogicalName = ?`,
        ["myId", ItemColumns.Title, "!!items"]
      );

      mockGenerator.SetControlResource(resource);
      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.context._parameters.items._InitItems(args.items || []);

      mockGenerator.context._SetCanvasItems({
        Title: args.Title,
        HideLegend: args.HideLegend,
        BarHeight: args.BarHeight,
        BarBackgroundColor: args.BarBackgroundColor,
        HideTooltip: args.HideTooltip,
        CustomColors: args.CustomColors,
        Theme: args.Theme,
        AccessibilityLabel: args.AccessibilityLabel,
        TabIndex: args.TabIndex,
        Tooltip: args.Tooltip,
      });

      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};
