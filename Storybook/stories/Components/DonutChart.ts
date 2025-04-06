import innerResource from "raw-loader!!../../../DonutChart/DonutChart/strings/DonutChart.1033.resx";
export * as resource from "raw-loader!!../../../DonutChart/DonutChart/strings/DonutChart.1033.resx";
import { generateGetFromResource } from "../getFromResourceGenerator";
export { DonutChart } from "../../../DonutChart/DonutChart";
export type { IInputs, IOutputs } from "../../../DonutChart/DonutChart/generated/ManifestTypes";
export  { ItemColumns } from '../../../DonutChart/DonutChart/ManifestConstants';

export const getFromResource = generateGetFromResource(innerResource);
