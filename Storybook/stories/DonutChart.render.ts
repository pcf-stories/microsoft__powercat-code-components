import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  StringPropertyMock,
  TwoOptionsPropertyMock,
  WholeNumberPropertyMock,
} from "@shko.online/componentframework-mock";
import {
  DonutChart as Component,
  IInputs,
  IOutputs,
  ItemColumns,
  resource,
} from "./Components/DonutChart";
import { PCFStoryArgs } from "./PCFStoryArgs";

export interface StoryArgs extends PCFStoryArgs {
  items: {
    myId: string;
    [ItemColumns.Key]: string;
    [ItemColumns.Color]: string;
    [ItemColumns.Legend]: string;
    [ItemColumns.Value]: number;
  }[];
  Title: string;
  CustomColors: boolean;
  HideLabel: boolean;
  HideTooltip: boolean;
  InnerRadius: number;
  ShowLabelsInPercentage: boolean;
  TabIndex: number;
  Theme: string;
  Tooltip: string;
  ValueInsideDonut: string;
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
      //var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.width = "350px";
      container.style.height = "350px";
      container.style.border = "dotted 1px";
      container.style.resize = "both";
      container.style.overflow = "auto";
      mockGenerator = new ComponentFrameworkMockGeneratorReact(
        Component,
        {
          items: DataSetMock,
          Title: StringPropertyMock,
          CustomColors: TwoOptionsPropertyMock,
          HideLabel: TwoOptionsPropertyMock,
          HideTooltip: TwoOptionsPropertyMock,
          InnerRadius: WholeNumberPropertyMock,
          ShowLabelsInPercentage: TwoOptionsPropertyMock,
          TabIndex: WholeNumberPropertyMock,
          Theme: StringPropertyMock,
          Tooltip: StringPropertyMock,
          ValueInsideDonut: StringPropertyMock,
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
        ["myId", ItemColumns.Legend, "!!items"]
      );

      mockGenerator.context._parameters.items._InitItems(args.items || []);

      mockGenerator.context._parameters.items.openDatasetItem.callsFake(
        (item) => {
          console.log(item.id);
          action("OpenDatasetItem")(item);
          // updateArgs({ ContextSelected: item.name });
        }
      );

      mockGenerator.context._SetCanvasItems({
        Theme: args.Theme,
        CustomColors: args.CustomColors,
        HideLabel: args.HideLabel,
        HideTooltip: args.HideTooltip,
        InnerRadius: args.InnerRadius,
        ShowLabelsInPercentage: args.ShowLabelsInPercentage,
        TabIndex: args.TabIndex,
        Title: args.Title,
        Tooltip: args.Tooltip,
        ValueInsideDonut: args.ValueInsideDonut,
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
