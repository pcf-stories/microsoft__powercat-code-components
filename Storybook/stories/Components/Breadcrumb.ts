import resource from "raw-loader!!../../../Breadcrumb/Breadcrumb/strings/Breadcrumb.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { Breadcrumb } from "../../../Breadcrumb/Breadcrumb";
export type { IInputs, IOutputs } from "../../../Breadcrumb/Breadcrumb/generated/ManifestTypes";
export  { ItemColumns } from '../../../Breadcrumb/Breadcrumb/ManifestConstants';

export const getFromResource = generateGetFromResource(resource);
