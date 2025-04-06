import resource from "raw-loader!!../../../Calendar/Calendar/strings/Calendar.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { Calendar } from "../../../Calendar/Calendar";
export type { IInputs, IOutputs } from "../../../Calendar/Calendar/generated/ManifestTypes";

export const getFromResource = generateGetFromResource(resource);
