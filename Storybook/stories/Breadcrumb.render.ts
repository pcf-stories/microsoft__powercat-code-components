import * as ReactDOM from "react-dom";

import { useArgs } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import { useEffect } from "@storybook/client-api";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  NumberPropertyMock,
  StringPropertyMock,
} from "@shko.online/componentframework-mock";
import {
  Breadcrumb,
  IInputs,
  IOutputs,
  ItemColumns,
} from "./Components/Breadcrumb";
import { PCFStoryArgs } from "./PCFStoryArgs";

export interface StoryArgs extends PCFStoryArgs {
  Accessibility: string;
  "Dataset Error"?: boolean;
  items: {
    myId: string;
    [ItemColumns.Key]: number;
    [ItemColumns.DisplayName]: string;
    [ItemColumns.Clickable]?: boolean;
  }[];
  MaxDisplayedItems: number;
  OverflowIndex: number;
  Theme: string;
  LastSelected: string;
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
      mockGenerator = new ComponentFrameworkMockGeneratorReact(Breadcrumb, {
        AccessibilityLabel: StringPropertyMock,
        InputEvent: StringPropertyMock,
        items: DataSetMock,
        MaxDisplayedItems: NumberPropertyMock,
        OverflowIndex: NumberPropertyMock,
        Theme: StringPropertyMock,
      });

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

     mockGenerator.context._parameters.items.sorting.push({
      name: 'myId',
      sortDirection: 0
     });

      mockGenerator.context._parameters.items._InitItems(args.items || []);
      mockGenerator.context._parameters.items.error =
        args["Dataset Error"] || false;

      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context._parameters.items.openDatasetItem.callsFake(
        (item) => {
          console.log(item.id);
          action("OpenDatasetItem")(item);
          updateArgs({ LastSelected: item.name });
        }
      );

      mockGenerator.metadata.initCanvasItems([
        {
          AccessibilityLabel: args.Accessibility,
          MaxDisplayedItems: args.MaxDisplayedItems,
          OverflowIndex: args.OverflowIndex,
          Theme: args.Theme,
        },
      ]);

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
