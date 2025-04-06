import * as ReactDOM from "react-dom";

import { useArgs } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import { useEffect } from "@storybook/client-api";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  StringPropertyMock,
} from "@shko.online/componentframework-mock";
import {
  CommandBar as Component,
  IInputs,
  IOutputs,
  ItemColumns,
  resource,
} from "./Components/CommandBar";
import { PCFStoryArgs } from "./PCFStoryArgs";

export interface StoryArgs extends PCFStoryArgs {
  Accessibility: string;
  InputEvent: string;
  items: {
    myId: string;
    [ItemColumns.DisplayName]: string;
    [ItemColumns.Key]: string;
    [ItemColumns.IconName]: string;
    [ItemColumns.IconColor]: string;
  }[];
  Theme: string;
  CommandSelected: string;
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
          Theme: StringPropertyMock,
          AccessibilityLabel: StringPropertyMock,
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
          updateArgs({ CommandSelected: item.name });
        }
      );

      mockGenerator.context._SetCanvasItems({
        Theme: args.Theme,
        AccessibilityLabel: args.Accessibility,
        InputEvent: args.InputEvent,
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
