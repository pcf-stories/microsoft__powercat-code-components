export type {
  IInputs,
  IOutputs,
} from "../../../CommandBar/CommandBar/generated/ManifestTypes";
import innerResource from "raw-loader!!../../../CommandBar/CommandBar/strings/CommandBar.1033.resx";
export * as resource from "raw-loader!!../../../CommandBar/CommandBar/strings/CommandBar.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { CommandBar } from "../../../CommandBar/CommandBar";
export { ItemColumns } from "../../../CommandBar/CommandBar/ManifestConstants";
export const getFromResource = generateGetFromResource(innerResource);
