export type {
  IInputs,
  IOutputs,
} from "../../../Facepile/Facepile/generated/ManifestTypes";
import innerResource from "raw-loader!!../../../Facepile/Facepile/strings/Facepile.1033.resx";
export * as resource from "raw-loader!!../../../Facepile/Facepile/strings/Facepile.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { Facepile } from "../../../Facepile/Facepile";
export { ItemColumns, OutputEvents } from "../../../Facepile/Facepile/ManifestConstants";
export const getFromResource = generateGetFromResource(innerResource);
