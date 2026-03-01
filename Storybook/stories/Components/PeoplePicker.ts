export type {
  IInputs,
  IOutputs,
} from "../../../PeoplePicker/PeoplePicker/generated/ManifestTypes";
import innerResource from "raw-loader!!../../../PeoplePicker/PeoplePicker/strings/PeoplePicker.1033.resx";
export * as resource from "raw-loader!!../../../PeoplePicker/PeoplePicker/strings/PeoplePicker.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { PeoplePicker } from "../../../PeoplePicker/PeoplePicker";
export {
  PersonaColumns,
  SuggestionColumns,
} from "../../../PeoplePicker/PeoplePicker/ManifestConstants";
export const getFromResource = generateGetFromResource(innerResource);
