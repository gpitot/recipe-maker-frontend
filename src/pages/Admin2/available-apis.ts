import API from "rest/api";

enum ApiCategory {
  "social",
}

export enum ParamType {
  "string",
  "option",
  "number",
}

export interface Param {
  type: ParamType;
  label: string;
  values?: string[];
}

export interface ApiConfig {
  key: string;
  category: ApiCategory;
  label: string;
  api: Function;
  columns: string[];
  params: Param[];
}

export default [
  {
    key: "getSocialSignups",
    category: ApiCategory.social,
    label: "Get report on social signups",
    api: API.admin.getSocialSignups,
    columns: ["count", "id", "firstname", "lastname"],
    params: [
      {
        type: ParamType.option,
        label: "Order",
        values: ["ASC", "DESC"],
      },
      {
        label: "Limit",
        type: ParamType.number,
      },
    ],
  },
];
