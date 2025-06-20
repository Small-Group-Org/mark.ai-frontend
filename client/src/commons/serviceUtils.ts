import apiHandler from "./apiHandle";
import { API_METHODS } from "./constant";
import { getValue, STORAGE_KEYS } from "./storage";


export const doGET = async function (url: string, signal?: AbortSignal) {
  try {
    const response = await apiHandler(url, API_METHODS.GET, null, signal)
    return response;
  } catch (err:any) {
    throw err?.message ?? 'An error occurred during the GET request';
  }
};

export const doPOST = async function (url: string, data: any, signal?: AbortSignal) {
  try {
    const response = await apiHandler(url, API_METHODS.POST, data, signal)
    return response;
  } catch (err:any) {
    throw err;
  }
};

export const doDELETE = async function (url: string, signal?: AbortSignal) {
  try {
    const response = await apiHandler(url, API_METHODS.DELETE, null, signal)
    return response;
  } catch (err:any) {
    throw err?.message ?? 'An error occurred during the DELETE request';
  }
};

export const doPUT = async function (url: string, data: any, signal?: AbortSignal) {
  try {
    const response = await apiHandler(url, API_METHODS.PUT, data, signal)
    return response;
  } catch (err:any) {
    throw err;
  }
}

