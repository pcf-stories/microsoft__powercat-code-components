export type { IInputs, IOutputs } from "../../../Card/Card/generated/ManifestTypes";
import innerResource from "raw-loader!!../../../Card/Card/strings/Card.1033.resx";
export * as resource from "raw-loader!!../../../Card/Card/strings/Card.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { Card } from "../../../Card/Card";
export { ItemColumns } from "../../../Card/Card/ManifestConstants";
export const getFromResource = generateGetFromResource(innerResource);