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
  id: string;
  type: ParamType;
  label: string;
  values?: string[];
  value: string | number;
}

export interface ApiConfig {
  key: string;
  category: ApiCategory;
  label: string;
  api: Function;
  columns: string[];
  params: Param[];
}

export enum MessageKeys {
  "social-freebie-reminder" = "social-freebie-reminder",
  "social-recent-user" = "social-recent-user",
}
export const MessageKeyList = [
  MessageKeys["social-freebie-reminder"],
  MessageKeys["social-recent-user"],
];

const availableAPIs = [
  {
    key: "getSocialSignups",
    category: ApiCategory.social,
    label: "Get report on social signups",
    api: API.admin.getSocialSignups,
    columns: ["count", "id", "firstname", "lastname"],
    params: [
      {
        id: "order",
        type: ParamType.option,
        label: "Order",
        values: ["ASC", "DESC"],
        value: "ASC",
      },
      {
        id: "limit",
        label: "Limit",
        type: ParamType.number,
        value: 10,
      },
    ],
  },
  {
    key: "getPotentialSocials",
    category: ApiCategory.social,
    label: "Get potential social signups",
    api: API.admin.getPotentialSocials,
    columns: ["id", "firstname", "lastname", "phone"],
    params: [
      {
        id: "mode",
        type: ParamType.option,
        label: "Mode",
        values: ["FREEBIE", "RECENT"],
        value: "FREEBIE",
      },
    ],
  },
];
export default availableAPIs;
