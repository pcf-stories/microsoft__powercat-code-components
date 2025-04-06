export type {
  IInputs,
  IOutputs,
} from "../../../ContextMenu/ContextMenu/generated/ManifestTypes";
import innerResource from "raw-loader!!../../../ContextMenu/ContextMenu/strings/ContextMenu.1033.resx";
export * as resource from "raw-loader!!../../../ContextMenu/ContextMenu/strings/ContextMenu.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { ContextMenu } from "../../../ContextMenu/ContextMenu";
export { ItemColumns } from "../../../ContextMenu/ContextMenu/ManifestConstants";
export const getFromResource = generateGetFromResource(innerResource);
