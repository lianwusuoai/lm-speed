import providerData from "@/provider/provider.json";
import modelData from "@/provider/model.json";

import { parseURL } from "ufo";

export const getProvider = (baseUrl: string) => {
  const host = baseUrl.includes("http") ? parseURL(baseUrl).host : baseUrl;
  return providerData.find((p) => p.baseHost === host);
};

export const getModel = (alias: string) => {
  return modelData.find((m) => m.alias.includes(alias));
};

export const getModelByName = (name: string) => {
  return modelData.find((m) => m.name === name);
};

export const getHost = (baseUrl: string) => parseURL(baseUrl).host;
