export type {
  IInputs,
  IOutputs,
} from "../../../FluentMessageBar/FluentMessageBar/generated/ManifestTypes";
import innerResource from "raw-loader!!../../../FluentMessageBar/FluentMessageBar/strings/FluentMessageBar.1033.resx";
export * as resource from "raw-loader!!../../../FluentMessageBar/FluentMessageBar/strings/FluentMessageBar.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { FluentMessageBar } from "../../../FluentMessageBar/FluentMessageBar";
export { ItemColumns } from "../../../FluentMessageBar/FluentMessageBar/ManifestConstant";
export const getFromResource = generateGetFromResource(innerResource);
