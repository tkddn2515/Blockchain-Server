import axios from "axios";
import { promise } from "./promise.js";
import { sleep } from "./time.js";

const apiUri = process.env.API_URI || 'http://localhost:21000/api';

const getApiUrl = (url) => {
  return `${apiUri}${url}`
}

export const get = async (url) => {
  const res = await axios.get(url, { timeout: 8000 });
  return res.data;
}

export const postApi = async (url, data) => {
  const res = await axios.post(getApiUrl(url), data);
  return res.data;
}

export const waitUntilPostApi = async (url, data) => {
  let res =	await promise(postApi(url, data), 10000);
  while (res === "timeout") {
    await sleep(5000);
    res =	await promise(postApi(url, data), 10000);
  }
  return res;
}