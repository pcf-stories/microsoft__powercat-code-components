import resource from "raw-loader!!../../../AutoWidthLabel/AutoWidthLabel/strings/AutoWidthLabel.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { AutoWidthLabel } from "../../../AutoWidthLabel/AutoWidthLabel";
export type { IInputs, IOutputs } from "../../../AutoWidthLabel/AutoWidthLabel/generated/ManifestTypes";

export const getFromResource = generateGetFromResource(resource);
