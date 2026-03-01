import * as ReactDOM from "react-dom";

import { useArgs, useEffect } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";
import {
  ComponentFrameworkMockGeneratorReact,
  DataSetMock,
  EnumPropertyMock,
  EventsBagMock,
  StringPropertyMock,
  TwoOptionsPropertyMock,
  WholeNumberPropertyMock,
} from "@shko.online/componentframework-mock";
import {
  IInputs,
  IOutputs,
  PeoplePicker as Component,
  PersonaColumns,
  resource,
  SuggestionColumns,
} from "./Components/PeoplePicker";
import { PCFStoryArgs } from "./PCFStoryArgs";

type PeoplePickerType =
  | "Normal People Picker"
  | "Compact People Picker"
  | "List People Picker";

export interface StoryArgs extends PCFStoryArgs {
  Theme: string;
  AccessibilityLabel: string;
  ShowSecondaryText: boolean;
  Error: boolean;
  MinimumSearchTermLength: number;
  SearchTermToShortMessage: string;
  NoResultFoundMessage: string;
  SuggestionsHeaderText: string;
  HintText: string;
  MaxPeople: number;
  PeoplePickerType: PeoplePickerType;
  InputEvent: string;
  SearchText: string;
  AutoHeight: number;
  SelectedPeople: unknown[];
  personas: {
    myId: string;
    [PersonaColumns.PersonaKey]: string;
    [PersonaColumns.PersonaName]: string;
    [PersonaColumns.PersonaImgUrl]?: string;
    [PersonaColumns.PersonaImageAlt]?: string;
    [PersonaColumns.PersonaPresence]?: string;
    [PersonaColumns.PersonaOOF]?: boolean;
    [PersonaColumns.PersonaRole]?: string;
  }[];
  suggestions: {
    myId: string;
    [SuggestionColumns.SuggestionKey]: string;
    [SuggestionColumns.SuggestionName]: string;
    [SuggestionColumns.SuggestionImgUrl]?: string;
    [SuggestionColumns.SuggestionImageAlt]?: string;
    [SuggestionColumns.SuggestionPresence]?: string;
    [SuggestionColumns.SuggestionOOF]?: boolean;
    [SuggestionColumns.SuggestionRole]?: string;
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
          Theme: StringPropertyMock,
          AccessibilityLabel: StringPropertyMock,
          ShowSecondaryText: TwoOptionsPropertyMock,
          Error: TwoOptionsPropertyMock,
          MinimumSearchTermLength: WholeNumberPropertyMock,
          SearchTermToShortMessage: StringPropertyMock,
          NoResultFoundMessage: StringPropertyMock,
          SuggestionsHeaderText: StringPropertyMock,
          HintText: StringPropertyMock,
          MaxPeople: WholeNumberPropertyMock,
          PeoplePickerType: EnumPropertyMock<PeoplePickerType>,
          InputEvent: StringPropertyMock,
          Personas: DataSetMock,
          Suggestions: DataSetMock,
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
        ["myId", PersonaColumns.PersonaName, "!!Personas"]
      );

      mockGenerator.metadata.db.exec(
        `UPDATE
          Metadata__Entity
         SET
          PrimaryIdAttribute = ? ,
          PrimaryNameAttribute = ?
         WHERE
          LogicalName = ?`,
        ["myId", SuggestionColumns.SuggestionName, "!!Suggestions"]
      );

      (mockGenerator.context.events as EventsBagMock).OnSearch.callsFake(() => {
        action("OnSearch")();
      });

      (mockGenerator.context.events as EventsBagMock).OnBlur.callsFake(() => {
        action("OnBlur")();
      });

      (mockGenerator.context.events as EventsBagMock).OnFocus.callsFake(() => {
        action("OnFocus")();
      });

      mockGenerator.onOutputChanged.callsFake((outputs) => {
        action("OutputChanged")(outputs);
        updateArgs({
          SearchText: outputs.SearchText ?? "",
          SelectedPeople: outputs.SelectedPeople ?? [],
          AutoHeight: outputs.AutoHeight ?? 0,
        });
      });

      mockGenerator.context._SetCanvasItems({
        Theme: args.Theme,
        AccessibilityLabel: args.AccessibilityLabel,
        ShowSecondaryText: args.ShowSecondaryText,
        Error: args.Error,
        MinimumSearchTermLength: args.MinimumSearchTermLength,
        SearchTermToShortMessage: args.SearchTermToShortMessage,
        NoResultFoundMessage: args.NoResultFoundMessage,
        SuggestionsHeaderText: args.SuggestionsHeaderText,
        HintText: args.HintText,
        MaxPeople: args.MaxPeople,
        PeoplePickerType: args.PeoplePickerType,
        InputEvent: args.InputEvent,
      });

      mockGenerator.SetControlResource(resource);
      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.context._parameters.Theme._SetValue(args.Theme);
      mockGenerator.context._parameters.AccessibilityLabel._SetValue(args.AccessibilityLabel);
      mockGenerator.context._parameters.ShowSecondaryText._SetValue(args.ShowSecondaryText);
      mockGenerator.context._parameters.Error._SetValue(args.Error);
      mockGenerator.context._parameters.MinimumSearchTermLength._SetValue(args.MinimumSearchTermLength);
      mockGenerator.context._parameters.SearchTermToShortMessage._SetValue(args.SearchTermToShortMessage);
      mockGenerator.context._parameters.NoResultFoundMessage._SetValue(args.NoResultFoundMessage);
      mockGenerator.context._parameters.SuggestionsHeaderText._SetValue(args.SuggestionsHeaderText);
      mockGenerator.context._parameters.HintText._SetValue(args.HintText);
      mockGenerator.context._parameters.MaxPeople._SetValue(args.MaxPeople);
      mockGenerator.context._parameters.PeoplePickerType._SetValue(args.PeoplePickerType);
      mockGenerator.context._parameters.InputEvent._SetValue(args.InputEvent);

      mockGenerator.context._parameters.Personas._InitItems(args.personas || []);
      mockGenerator.context._parameters.Suggestions._InitItems(args.suggestions || []);

      ReactDOM.render(mockGenerator.ExecuteUpdateView(), container);
    }

    return container;
  };
};
