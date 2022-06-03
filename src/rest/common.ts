import axios from "axios";

export const BASE_URL = `https://x1jj2pm8s3.execute-api.ap-southeast-2.amazonaws.com/dev`;
export interface IJsonResponse<T> {
  data: T;
}

export interface IResultResponse {
  success: boolean;
  err?: string;
}

export const commonAxiosConfig = {
  headers: { "Content-Type": "application/json" },
};

export const API = async (url: "select" | "insert", data: any) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/${url}`,
      data,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
