import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import {
  ComponentFrameworkMockGeneratorReact,
  DateTimePropertyMock,
  EnumPropertyMock,
  StringPropertyMock,
  TwoOptionsPropertyMock,
} from "@shko.online/componentframework-mock";
import { Calendar, IInputs, IOutputs } from "./Components/Calendar";
import { PCFStoryArgs } from "./PCFStoryArgs";


export type DaysOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface StoryArgs extends PCFStoryArgs {
  Theme: string;
  AccessibilityLabel: string;
  BackgroundColor: string;
  DayPickerVisible: boolean;
  FirstDayOfWeek: DaysOfWeek;
  HighlightCurrentMonth: boolean;
  HighlightSelectedMonth: boolean;
  InputEvent: string;
  Language: string;
  MaxDate: Date;
  MinDate: Date;
  MonthPickerVisible: boolean;
  SelectedDateValue: Date;
  ShowGoToToday: boolean;
  ShowSixWeeksByDefault: boolean;
  ShowWeekNumbers: boolean;
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
      mockGenerator = new ComponentFrameworkMockGeneratorReact(Calendar, {
        Theme: StringPropertyMock,
        AccessibilityLabel: StringPropertyMock,
        BackgroundColor: StringPropertyMock,
        DayPickerVisible: TwoOptionsPropertyMock,
        FirstDayOfWeek: EnumPropertyMock<DaysOfWeek>,
        HighlightCurrentMonth: TwoOptionsPropertyMock,
        HighlightSelectedMonth: TwoOptionsPropertyMock,
        InputEvent: StringPropertyMock,
        Language: StringPropertyMock,
        MaxDate: DateTimePropertyMock,
        MinDate: DateTimePropertyMock,
        MonthPickerVisible: TwoOptionsPropertyMock,
        SelectedDateValue: DateTimePropertyMock,
        ShowGoToToday: TwoOptionsPropertyMock,
        ShowSixWeeksByDefault: TwoOptionsPropertyMock,
        ShowWeekNumbers: TwoOptionsPropertyMock,
      });

      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.metadata.initCanvasItems([
        {
          AccessibilityLabel: args.AccessibilityLabel,
          BackgroundColor: args.BackgroundColor,
          DayPickerVisible: args.DayPickerVisible,
          FirstDayOfWeek: args.FirstDayOfWeek,
          HighlightCurrentMonth: args.HighlightCurrentMonth,
          HighlightSelectedMonth: args.HighlightSelectedMonth,
          Language: args.Language,
          MaxDate: args.MaxDate,
          MinDate: args.MinDate,
          MonthPickerVisible: args.MonthPickerVisible,
          SelectedDateValue: args.SelectedDateValue,
          ShowGoToToday: args.ShowGoToToday,
          ShowWeekNumbers: args.ShowWeekNumbers,
          ShowSixWeeksByDefault: args.ShowSixWeeksByDefault,
          Theme: args.Theme,
        },
      ]);

      mockGenerator.onOutputChanged.callsFake(() => {
        const { SelectedDateValue } =
          mockGenerator.control.getOutputs?.() || {};
        updateArgs({ SelectedDateValue });
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.context._parameters.AccessibilityLabel._SetValue(
        args.AccessibilityLabel
      );
      mockGenerator.context._parameters.BackgroundColor._SetValue(
        args.BackgroundColor
      );
      mockGenerator.context._parameters.DayPickerVisible._SetValue(
        args.DayPickerVisible
      );
      mockGenerator.context._parameters.FirstDayOfWeek._SetValue(
        args.FirstDayOfWeek
      );
      mockGenerator.context._parameters.HighlightCurrentMonth._SetValue(
        args.HighlightCurrentMonth
      );
      mockGenerator.context._parameters.HighlightSelectedMonth._SetValue(
        args.HighlightSelectedMonth
      );
      mockGenerator.context._parameters.Language._SetValue(args.Language);
      mockGenerator.context._parameters.MaxDate._SetValue(args.MaxDate);
      mockGenerator.context._parameters.MinDate._SetValue(args.MinDate);
      mockGenerator.context._parameters.MonthPickerVisible._SetValue(
        args.MonthPickerVisible
      );
      mockGenerator.context._parameters.SelectedDateValue._SetValue(
        args.SelectedDateValue
      );
      mockGenerator.context._parameters.ShowGoToToday._SetValue(
        args.ShowGoToToday
      );
      mockGenerator.context._parameters.ShowWeekNumbers._SetValue(
        args.ShowWeekNumbers
      );
      mockGenerator.context._parameters.ShowSixWeeksByDefault._SetValue(
        args.ShowSixWeeksByDefault
      );
      mockGenerator.context._parameters.Theme._SetValue(args.Theme);

      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};
